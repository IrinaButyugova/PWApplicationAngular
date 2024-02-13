import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CreateTransactionFormModel } from "./create-transaction-form.model";
import { UserInterface } from "../types/user.interface";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { errorSelector, usersSelector } from "./store/selectors";
import { getUsersAction } from "./store/actions/getUsers.action";

@Component({
  selector: "create-tran",
  templateUrl: "./create-transaction.component.html",
})
export class CreateTransactionComponent implements OnInit {
  createTransactionForm!: FormGroup;
  users$!: Observable<UserInterface[] | null>;
  errorMessage$!: Observable<string | null>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.createTransactionForm = this.formBuilder.group(
      new CreateTransactionFormModel()
    );
    this.createTransactionForm.controls["name"].setValidators(
      Validators.required
    );
    this.createTransactionForm.controls["amount"].setValidators([
      Validators.required,
      Validators.min(0),
    ]);

    this.route.queryParams.subscribe((queryParam: any) => {
      this.createTransactionForm.controls["name"].setValue(queryParam["name"]);
      this.createTransactionForm.controls["amount"].setValue(
        queryParam["amount"]
      );
    });

    this.users$ = this.store.pipe(select(usersSelector));
    this.errorMessage$ = this.store.pipe(select(errorSelector));

    this.store.dispatch(getUsersAction());
  }

  submit() {}
}
