import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { errorSelector, isLoggedInSelector } from "./store/selectors";
import { logoutAction } from "./store/actions/logout.actions";

@Component({
  selector: "auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  errorMessage$!: Observable<string | null>;
  signInActive: boolean = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.errorMessage$ = this.store.pipe(select(errorSelector));
  }

  signIn(): void {
    this.signInActive = true;
  }

  signUp(): void {
    this.signInActive = false;
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
