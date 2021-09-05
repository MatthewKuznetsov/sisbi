import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  private readonly LS_PREFIX = "sis-";

  setItem(key: string, value: any): void {
    localStorage.setItem(this.LS_PREFIX + key, this._toJSON(value));
  }

  getItem(key: string): any {
    return this._parseJSON(localStorage.getItem(this.LS_PREFIX + key));
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.LS_PREFIX + key);
  }

  private _toJSON(value: any): string {
    try {
      return JSON.stringify(value);
    } catch (err) {
      console.warn('Can not stringify: ', value, err);
      return value.toString();
    }
  }

  private _parseJSON(value: string | null): any {
    if (value == null) { return null; }
    try {
      return JSON.parse(value);
    } catch (err) {
      console.warn('Can not parse: ', value, err);
      return value;
    }
  }

}
