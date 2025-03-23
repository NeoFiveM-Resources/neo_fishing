import {QbCoreServerFramework} from "./qbCoreServerFramework";
import {ServerInventory} from "../inventory/serverInventory";

export class QBoxServerFramework extends QbCoreServerFramework {

    constructor(readonly inventory: ServerInventory) {
        super('qbx', inventory);
    }

    getPlayer(source: number): unknown {
        return exports.qbx_core.GetPlayer(source) as QboxPlayer
    }
}
