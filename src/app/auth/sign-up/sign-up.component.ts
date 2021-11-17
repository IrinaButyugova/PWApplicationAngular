import { Component, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { mustMatchValidator } from '../../validators/must-match-validator';
import { SignUpFormModel } from './sign-up.model';
import { ValidEmailPattern } from 'src/app/app-config';

@Component({
    selector: "sign-up",
    templateUrl: "./sign-up.component.html"
})

export class SignUpComponent implements OnDestroy {
    signUpForm: FormGroup;
    errorMessage: String = "";

    private onDestroy$ = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ){
        this.signUpForm = this.formBuilder.group(new SignUpFormModel(), {
            validators: mustMatchValidator("password", "passwordConfirmation")
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
    }

    submit() {
        if (this.signUpForm.valid) {
            this.authService.signUp$(this.signUpForm.value["name"],
            this.signUpForm.value["email"],
            this.signUpForm.value["password"])
            .pipe(catchError((err) => {
                this.errorMessage = err.error;
                throw err; 
            }),
            takeUntil(this.onDestroy$))
            .subscribe(() => {
                this.errorMessage = "";
            });
        }
    }

    ngOnDestroy(): void {
        this.onDestroy$.next(null);
        this.onDestroy$.complete();
    }
}