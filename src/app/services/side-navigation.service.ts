import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root'})
export class SideNavigationService {

  menu = new BehaviorSubject(false);

  constructor() {
  }

  toggleMenu(): void {
    this.menu.next(!this.menu.value)
  }
}
