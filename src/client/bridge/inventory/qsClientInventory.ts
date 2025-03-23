import {ClientInventory} from "./clientInventory";
import {ClientFramework} from "../framework/clientFramework";

export class QsClientInventory extends ClientInventory {

    getPlayerInventory(framework?: ClientFramework): unknown {
        return exports[this.name].getUserInventory();
    }

    getItemData(item: string, framework?: ClientFramework): unknown {
        const items = exports[this.name].GetItemList();
        if (!items.length) return {};
        return items[item];
    }
}
