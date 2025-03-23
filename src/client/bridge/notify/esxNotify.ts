import {NotifyBase} from "./notifyBase";
import {clientFramework} from "../../index";
import {EsxClientFramework} from "../framework/esxClientFramework";

export class EsxNotify extends NotifyBase {

    showNotification(message: string, type: string, title?: string, position?: string, duration?: number, playSound?: boolean, icon?: string) {
        if (clientFramework instanceof EsxClientFramework) {
            clientFramework.ESX.ShowNotification(message);

        } else {
            console.error('ESX notifications selected but no detected ESX framework');
            super.showNotification(message, type, title, position, duration, playSound, icon);
        }
    }

}
