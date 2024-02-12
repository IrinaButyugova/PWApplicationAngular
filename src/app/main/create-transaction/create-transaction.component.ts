import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError } from "rxjs/operators";

import { CreateTransactionFormModel } from "./create-transaction-form.model";
import { MainService } from "../services/main.service";
import { CurrentUserInterface } from "../types/currentUser.interface";

@Component({
  selector: "create-tran",
  templateUrl: "./create-transaction.component.html",
})
export class CreateTransactionComponent implements OnInit {
  createTransactionForm: FormGroup;
  errorMessage: string = "";
  usersInfo: Array<CurrentUserInterface> = new Array();

  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
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

    route.queryParams.subscribe((queryParam: any) => {
      this.createTransactionForm.controls["name"].setValue(queryParam["name"]);
      this.createTransactionForm.controls["amount"].setValue(
        queryParam["amount"]
      );
    });
  }

  ngOnInit() {
    this.mainService
    .getFilteredUserList$()
    .pipe(
      catchError((err) => {
        this.errorMessage = err.error;
        throw err;
      })
    )
    .subscribe((data: Array<CurrentUserInterface>) => {
      this.usersInfo = data;
    });
  }

  submit() {
    this.mainService
    .createTransaction$(
      this.createTransactionForm.value["name"],
      this.createTransactionForm.value["amount"]
    )
    .pipe(
      catchError((err) => {
        this.errorMessage = err.error;
        throw err;
      })
    )
    .subscribe(() => {
      this.errorMessage = "";
    });
  }
}
