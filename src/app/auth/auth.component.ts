import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { isLoggedInSelector } from "./store/selectors";

@Component({
  selector: "auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  signInActive: boolean = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  signIn(): void {
    this.signInActive = true;
  }

  signUp(): void {
    this.signInActive = false;
  }
}
