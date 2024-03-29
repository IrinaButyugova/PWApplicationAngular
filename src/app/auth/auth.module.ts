import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { AuthComponent } from "./auth.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInEffect } from "./store/effects/signIn.effect";
import { reducers } from "./store/reducers";
import { SignUpEffect } from "./store/effects/signUp.effect";
import { LogoutEffect } from "./store/effects/logout.effect";
import { SharedModule } from "../shared/shared.module";
import { AuthCheckEffect } from "./store/effects/authCheck.effect";
import { AuthService } from "./services/auth.service";

@NgModule({
  declarations: [AuthComponent, SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature("auth", reducers),
    EffectsModule.forFeature([
      SignInEffect,
      SignUpEffect,
      LogoutEffect,
      AuthCheckEffect,
    ]),
  ],
  exports: [AuthComponent],
  providers: [AuthService],
})
export class AuthModule {}
