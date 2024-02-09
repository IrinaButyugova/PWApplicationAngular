import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { Paths } from "../paths";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: Paths.SignIn,
        component: SignInComponent,
        data: {
          title: "Sign in",
        },
      },
      {
        path: Paths.SignUp,
        component: SignUpComponent,
        data: {
          title: "Sign up",
        },
      },
      {
        path: "**",
        redirectTo: "",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
