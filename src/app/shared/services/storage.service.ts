import { Injectable, InjectionToken, PLATFORM_ID, inject } from '@angular/core';

const LOCAL_STORAGE = new InjectionToken<Storage | null>(
  'local storage object',
  {
    providedIn: 'root',
    factory: () =>
      inject(PLATFORM_ID) === 'browser' ? window.localStorage : null,
  }
);

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly storage = inject(LOCAL_STORAGE);

  constructor() {
    if (!this.storage) {
      console.error('STORAGE DISABLED!');
    }
  }

  get<T>(key: string): T | null {
    try {
      return JSON.parse(this.storage?.getItem(key) || '');
    } catch (err) {
      return null;
    }
  }

  set<T>(key: string, data: T): void {
    this.storage?.setItem(key, JSON.stringify(data));
  }

  remove(key: string): void {
    this.storage?.removeItem(key);
  }
}
