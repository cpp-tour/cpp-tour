import Cookie from '@/cookie';

export default class LocalStorage {
  public storageEnabled: boolean = false;
  protected hasLocalStorage: boolean = false;
  protected temporaryStorage: {[name: string]: any} = {};

  constructor() {
    this.hasLocalStorage = this.storageAvailable('localStorage');

    const cookieBanner = new Cookie('cpp-tour-banner');
    this.storageEnabled = cookieBanner.read() === 'true';
  }

  public getItem(key: string): any {
    if (this.hasLocalStorage && this.storageEnabled) {
      return localStorage.getItem(key);
    }
    return this.temporaryStorage[key];
  }

  public setItem(key: string, value: any): void {
    if (this.hasLocalStorage && this.storageEnabled) {
      localStorage.setItem(key, value);
    }
    this.temporaryStorage[key] = value;
  }

  public removeItem(key: string): void {
    if (this.hasLocalStorage && this.storageEnabled) {
      localStorage.removeItem(key);
    }
    delete this.temporaryStorage[key];
  }

  protected storageAvailable(type: string): boolean {
    let storage: any;
    try {
        storage = (window as any)[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
  }
}
