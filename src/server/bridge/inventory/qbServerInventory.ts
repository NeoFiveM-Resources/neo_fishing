import {ServerInventory} from "./serverInventory";
import {ServerFramework} from "../framework/serverFramework";

export class QbServerInventory extends ServerInventory {
    canCarry(source: number, item: string, count: number, framework?: ServerFramework): boolean {
        return exports[this.name].CanAddItem(source, item, count) as boolean
    }
}
