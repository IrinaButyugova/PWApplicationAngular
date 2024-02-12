import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { isLoggedInSelector } from "./auth/store/selectors";
import { authCheckAction } from "./auth/store/actions/authCheck.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "PWApplicationAngular";
  isLoggedIn$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.store.dispatch(authCheckAction());
  }
}
