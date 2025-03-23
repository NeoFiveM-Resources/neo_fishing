import {ClientInventory} from "./clientInventory";
import {ClientFramework} from "../framework/clientFramework";

export class CodeMClientInventory extends ClientInventory {

    getPlayerInventory(framework?: ClientFramework): unknown {
        return exports[this.name].GetClientPlayerInventory();
    }

    getItemData(item: string, framework?: ClientFramework): unknown {
        const items = exports[this.name].GetItemList();
        if (!items) return;
        return items[item];
    }
}
