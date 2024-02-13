import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CreateTransactionComponent } from "./create-transaction/create-transaction.component";
import { Paths } from "./paths";
import { DataComponent } from "./data/data.component";

const routes: Routes = [
  {
    path: "",
    component: DataComponent,
  },
  {
    path: Paths.CreateTransaction,
    component: CreateTransactionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
