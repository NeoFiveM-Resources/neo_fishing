import {NotifyBase} from "./notifyBase";
import {clientFramework} from "../../index";
import {QbCoreClientFramework} from "../framework/qbCoreClientFramework";
import {QBoxClientFramework} from "../framework/qBoxClientFramework";

export class QbNotify extends NotifyBase {
    showNotification(message: string, type: string, title?: string, position?: string, duration?: number, playSound?: boolean, icon?: string) {
        if (clientFramework instanceof QbCoreClientFramework || clientFramework instanceof QBoxClientFramework) {
            clientFramework.QBCORE.Functions.Notify(message, type);
        }
        console.error('Qb notifications selected but no detected QB or QBox framework');
        super.showNotification(message, type, title, position, duration, playSound, icon);
    }
}
