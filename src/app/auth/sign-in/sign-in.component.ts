import { Component, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { AuthService } from '../auth.services';
import { mustMatchValidator } from '../../validators/must-match-validator';
import { SignInFormModel } from './sign-in.model';
import { ValidEmailPattern } from 'src/app/app-config';

@Component({
    selector: "sign-in",
    templateUrl: "./sign-in.component.html",
    providers: [AuthService]
})

export class SignInComponent implements OnDestroy {
    signInForm: FormGroup;
    errorMessage: String = "";

    private onDestroy$ = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ){
        this.signInForm = this.formBuilder.group(new SignInFormModel());
        this.signInForm.controls["email"].setValidators([
            Validators.required,
            Validators.pattern(ValidEmailPattern),
          ]);
        this.signInForm.controls["password"].setValidators([Validators.required]);
    }

    submit() {
        if (this.signInForm.valid) {
            this.authService.signIn$(this.signInForm.value["email"],
            this.signInForm.value["password"])
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