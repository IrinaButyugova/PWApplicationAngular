import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInEffect } from "./store/effects/signIn.effect";
import { reducers } from "./store/reducers";
import { SignUpEffect } from "./store/effects/signUp.effect";

@NgModule({
  declarations: [AuthComponent, SignInComponent, SignUpComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature("auth", reducers),
    EffectsModule.forFeature([SignInEffect, SignUpEffect]),
  ],
})
export class AuthModule {}
