import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './services/auth.service';
import { MainGuard } from './main/main.guard';
import { Paths } from './paths'

const routes: Routes = [
    {
      path: "",
      loadChildren: () => import("./main/main.module").then((m) => m.MainModule),
      canActivate: [MainGuard],
    },
    {
      path: Paths.Auth,
      loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
    },
    {
      path: "**",
      redirectTo: "",
      pathMatch: "full",
    },
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [MainGuard, AuthService]
  })
  export class AppRoutingModule {}