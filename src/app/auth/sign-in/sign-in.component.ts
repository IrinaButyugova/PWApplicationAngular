import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";

import { SignInFormModel } from "./sign-in.model";
import { ValidEmailPattern } from "src/app/app-config";
import { errorSelector, isSubmittingSelector } from "../store/selectors";
import { SignInRequestInterface } from "src/app/types/signInRequest.interface";
import { signInAction } from "../store/actions/signIn.actions";

@Component({
  selector: "sign-in",
  templateUrl: "./sign-in.component.html",
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  errorMessage$!: Observable<string | null>;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group(new SignInFormModel());
    this.signInForm.controls["email"].setValidators([
      Validators.required,
      Validators.pattern(ValidEmailPattern),
    ]);
    this.signInForm.controls["password"].setValidators([Validators.required]);

    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.errorMessage$ = this.store.pipe(select(errorSelector));
  }

  submit(): void {
    if (this.signInForm.valid) {
      const request: SignInRequestInterface = {
        email: this.signInForm.value["email"],
        password: this.signInForm.value["password"],
      };
      this.store.dispatch(signInAction({ request }));
    }
  }
}
