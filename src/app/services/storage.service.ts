import { Injectable } from "@angular/core";

import { StorageKeys } from "./storage-keys";

@Injectable()
export class StorageService {
  public addToLocalStorage(key: StorageKeys, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getFromLocalStorage(key: StorageKeys): any {
    const data = localStorage.getItem(key);
    if (data != null) {
      return data;
    } else {
      return null;
    }
  }
  public clearLocalStorage() {
    localStorage.clear();
  }
}
