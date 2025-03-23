import {ClientInventory} from "./clientInventory";
import {ClientFramework} from "../framework/clientFramework";

export class OrigenClientInventory extends ClientInventory {
    getPlayerInventory(framework?: ClientFramework): unknown {
        return exports[this.name].GetInventory();
    }

    getItemData(item: string, framework?: ClientFramework): unknown {
        const items = exports[this.name].GetItems();
        if (!items.length) return undefined;
        return items[item];
    }
}
