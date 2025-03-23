import {ServerFramework} from "./serverFramework";
import {ServerInventory} from "../inventory/serverInventory";

export class QbCoreServerFramework extends ServerFramework {
    QB_CORE: QbCore;

    constructor(readonly name: 'qb' | 'qbx', readonly inventory: ServerInventory) {
        super(name, inventory);
        this.QB_CORE = exports['qb-core'].GetCoreObject();
    }

    getPlayer(source: number): unknown {
        return this.QB_CORE.Functions.getPlayer(source);
    }

    getIdentifier(source: number): string | number {
        const player = this.getPlayer(source) as QbPlayer;
        if (!player) return undefined;
        return player.PlayerData.citizenid;
    }

    getName(source: number): string {
        const player = this.getPlayer(source) as QbPlayer;
        if (!player) return 'Unknown';
        return player.PlayerData.charinfo.firstname + ' ' + player.PlayerData.charinfo.lastname;
    }

    getItemCount(source: number, item: string): number {
        if (this.inventory) return super.getItemCount(source, item);
        const player = this.getPlayer(source) as QbPlayer;
        if (!player) return 0;
        const itemData = player.Functions.getItemByName(item);
        if (!itemData) return 0;
        return itemData.amount || itemData.count || 0;
    }

    convertMoneyType(type: string): string {
        if (type === 'money') return 'cash'
        return super.convertMoneyType(type);
    }

    getPlayerBalance(source: number, type: string): number {
        const player = this.getPlayer(source) as QbPlayer;
        if (!player) return 0;
        return player.Functions.GetMoney(this.convertMoneyType(type)) || 0;
    }

    addMoney(source: number, type: string, amount: number) {
        const player = this.getPlayer(source) as QbPlayer;
        if (!player) return 0;
        player.Functions.AddMoney(this.convertMoneyType(type), amount);
    }

    removeMoney(source: number, type: string, amount: number) {
        const player = this.getPlayer(source) as QbPlayer;
        if (!player) return 0;
        player.Functions.RemoveMoney(this.convertMoneyType(type), amount);
    }

    canCarry(source: number, item: string, count: number): boolean {
        if (this.inventory) return super.canCarry(source, item, count);
        const player = this.getPlayer(source) as QbPlayer;
        if (!player) return false;
        const playerData = player.PlayerData;
        const totalWeight = this.QB_CORE.Player.GetTotalWeight(playerData.items)
        if (!totalWeight) return false;
        const items = this.QB_CORE.Shared.Items
        const itemInfo = items[item.toLowerCase()] as Record<string, unknown>;
        if (!itemInfo) return false;
        return (totalWeight + (itemInfo['weight'] as number * count)) <= 120000;
    }

    addItem(source: number, item: string, count: number, metadata: Record<string, unknown>) {
        if (this.inventory) {
            super.addItem(source, item, count, metadata);
            if (this.name === 'qb') {
                const items = this.QB_CORE.Shared.Items
                TriggerClientEvent(this.inventory + ':client:ItemBox', source, items[item], 'add');
            }
        } else {
            const player = this.getPlayer(source) as QbPlayer;
            if (!player) return;
            player.Functions.AddItem(item, count, undefined, metadata)
        }
    }

    removeItem(source: number, item: string, count: number) {
        const player = this.getPlayer(source) as QbPlayer;
        if (!player) return;
        if (this.inventory) {
            super.removeItem(source, item, count);
            if (this.name === 'qb') {
                const items = this.QB_CORE.Shared.Items
                TriggerClientEvent(this.inventory + ':client:ItemBox', source, items[item], 'remove');
            }
        } else {
            player.Functions.RemoveItem(item, count);
        }
    }
}
