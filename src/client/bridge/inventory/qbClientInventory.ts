import {ClientInventory} from "./clientInventory";
import {ClientFramework} from "../framework/clientFramework";
import {QbCoreClientFramework} from "../framework/qbCoreClientFramework";

export class QbClientInventory extends ClientInventory {
    getPlayerInventory(framework?: ClientFramework): unknown {
        if (framework instanceof QbCoreClientFramework) {
            return (framework.getPlayerInventory() as any).items;
        }
        return super.getPlayerInventory(framework);
    }

    getItemData(item: string, framework?: ClientFramework): unknown {
        if (framework instanceof QbCoreClientFramework) {
            return framework.QBCORE.Shared.Items[item]
        }
        return super.getItemData(item, framework);
    }
}
