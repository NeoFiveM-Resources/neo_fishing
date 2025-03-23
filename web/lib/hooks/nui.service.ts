import { Injectable, type OnDestroy } from '@angular/core';

export type NuiEventHandler<T = any> = (data: T) => void;

export interface NuiMessage<T = unknown> {
  action: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class NuiService implements OnDestroy {
  private eventListeners = new Map<string, NuiEventHandler[]>();

  constructor() {
    window.addEventListener('message', this.eventListener);
  }

  private eventListener = (event: MessageEvent<NuiMessage>) => {
    const { action, data } = event.data;
    const handlers = this.eventListeners.get(action);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  };

  useNuiEvent<T = unknown>(action: string, handler: NuiEventHandler<T>): void {
    const handlers = this.eventListeners.get(action) || [];
    handlers.push(handler);
    this.eventListeners.set(action, handlers);
  }

  removeNuiEvent<T = unknown>(action: string, handler: NuiEventHandler<T>): void {
    const handlers = this.eventListeners.get(action) || [];
    this.eventListeners.set(
      action,
      handlers.filter((h) => h !== handler),
    );
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.eventListener);
    this.eventListeners.clear();
  }
}
