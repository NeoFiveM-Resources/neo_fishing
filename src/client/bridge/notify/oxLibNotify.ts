import {NotifyBase} from "./notifyBase";
import * as lib from '@overextended/ox_lib/client'

type NotificationPosition = 'top'
    | 'top-right'
    | 'top-left'
    | 'bottom'
    | 'bottom-right'
    | 'bottom-left'
    | 'center-right'
    | 'center-left';
type NotificationType = 'inform' | 'error' | 'success';

export class OxLibNotify extends NotifyBase {
    showNotification(message: string, type: NotificationType, title?: string, position?: NotificationPosition, duration?: number, playSound?: boolean, icon?: string) {
        lib.notify({
            description: message,
            type: type as NotificationType,
            position: position as NotificationPosition,
            duration: duration,
            icon: icon
        });
    }
}
