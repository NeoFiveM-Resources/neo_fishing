import {ClientInventory} from "./clientInventory";
import {ClientFramework} from "../framework/clientFramework";
import {QbCoreClientFramework} from "../framework/qbCoreClientFramework";

export class CoreClientInventory extends ClientInventory {
    getPlayerInventory(framework?: ClientFramework): unknown {
        if (framework instanceof QbCoreClientFramework) {
            return framework.getPlayerInventory();
        }
        return super.getPlayerInventory(framework);
    }

    getItemData(item: string, framework?: ClientFramework): unknown {
        if (framework instanceof QbCoreClientFramework) {
            return framework.QBCORE.Shared.Items[item];
        }
        return super.getItemData(item, framework);
    }

    hasItem(item: string, amount: number): boolean {
        return exports[this.name].hasItem(item, amount);
    }
}
