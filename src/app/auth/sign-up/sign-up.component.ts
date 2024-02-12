import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";

import { mustMatchValidator } from "../../validators/must-match-validator";
import { SignUpFormModel } from "./sign-up.model";
import { ValidEmailPattern } from "src/app/app-config";
import { isSubmittingSelector } from "../store/selectors";
import { SignUpRequestInterface } from "src/app/auth/types/signUpRequest.interface";
import { signUpAction } from "../store/actions/signUp.actions";

@Component({
  selector: "sign-up",
  templateUrl: "./sign-up.component.html",
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(new SignUpFormModel(), {
      validators: mustMatchValidator("password", "passwordConfirmation"),
    });
    this.signUpForm.controls["name"].setValidators([Validators.required]);
    this.signUpForm.controls["email"].setValidators([
      Validators.required,
      Validators.pattern(ValidEmailPattern),
    ]);
    this.signUpForm.controls["password"].setValidators([Validators.required]);
    this.signUpForm.controls["passwordConfirmation"].setValidators([
      Validators.required,
    ]);

    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  submit() {
    if (this.signUpForm.valid) {
      const request: SignUpRequestInterface = {
        username: this.signUpForm.value["name"],
        email: this.signUpForm.value["email"],
        password: this.signUpForm.value["password"],
      };
      this.store.dispatch(signUpAction({ request }));
    }
  }
}
