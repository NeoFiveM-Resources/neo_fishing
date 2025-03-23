import {NotifyBase} from "./notifyBase";

export class SdNotify extends NotifyBase {
    showNotification(message: string, type: string, title?: string, position?: string, duration?: number, playSound?: boolean, icon?: string) {
        exports['sd-notify'].Notify(title, message, title);
    }
}
