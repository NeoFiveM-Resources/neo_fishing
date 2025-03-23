import {Inventory} from "@common/bridge/inventory/inventory";

export class Framework {
    constructor(readonly name: string, readonly inventory: Inventory) {
        this.name = name;
        this.inventory = inventory;
    }
}
