export class NotifyBase {
    constructor(readonly name: string) {
    }

    showNotification(message: string, type: string, title?: string, position?: string, duration?: number, playSound?: boolean, icon?: string): void {
        console.warn('NotifyBase.showNotification is not implemented');
    }
}
