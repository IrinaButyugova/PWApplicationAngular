import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    declarations: [
        AuthComponent, 
        SignInComponent, 
        SignUpComponent
    ],
    imports: [
        AuthRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule]
})

export class AuthModule {}