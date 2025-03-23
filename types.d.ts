declare interface Esx {
    GetPlayerFromId: (source: number) => unknown
}

declare interface EsxPlayer {
    identifier: string;

    getName(): string;

    getInventoryItem(item: string): EsxItem

    getAccount(type: string): EsxAccount

    addAccountMoney(type: string, amount: number): void

    removeAccountMoney(type: string, amount: number): void

    canCarryItem(item: string, count: number): boolean

    addInventoryItem(item: string, count: number): void

    removeInventoryItem(item: string, count: number): void
}

declare interface EsxItem {
    amount: number;
    count: number;
}

declare interface EsxAccount {
    money: number;
}

declare interface OxCore {
    getPlayer(source: number): OxPlayer;

    GetCharacterAccount(source: number): OxCharacterAccount;

    DepositMoney(source: number, id: number, amount: number): void;

    WithdrawMoney(source: number, id: number, amount: number): void;
}

declare interface OxPlayer {
    stateId: number | string;

    get(field: string): string
}

declare interface OxCharacterAccount {
    balance: number;
    id: number;
}

interface QbCore {
    Player: QbPlayer;
    Shared: QbShared;
    Functions: QbCoreFunctions;
}

declare interface QbPlayer {
    PlayerData: QbPlayerData;
    Functions: QbPlayerFunctions;

    GetTotalWeight(items: Record<string, unknown>): number;
}

declare interface QbPlayerData {
    citizenid: string;
    charinfo: QbCharInfo;
    items: Record<string, unknown>;
}

declare interface QbShared {
    Items: Record<string, unknown>;
}

declare interface QbCharInfo {
    firstname: string;
    lastname: string;
}

declare interface QbCoreFunctions {
    getPlayer(source: number): QbPlayer;
}

declare interface QbPlayerFunctions {
    getItemByName(item: string): QbItem;

    GetMoney(type: string): number;

    AddMoney(type: string, amount: number): void;

    RemoveMoney(type: string, amount: number): void;

    AddItem(type: string, amount: number, optional: unknown, metadata: Record<string, unknown>): void;

    RemoveItem(type: string, amount: number): void;
}

declare interface QbItem {
    amount: number;
    count: number;
}

declare interface QboxPlayer extends QbPlayer {
}

declare interface ItemData {
    amount: number;
    count: number;
}
