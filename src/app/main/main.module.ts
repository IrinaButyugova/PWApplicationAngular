import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { CreateTransactionComponent } from "./create-transaction/create-transaction.component";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";
import { MainService } from "./services/main.service";
import { reducers as dataReducers } from "./data/store/reducers";
import { reducers as createTransactionReducers } from "./create-transaction/store/reducers";
import { GetCurrentUserEffect } from "./data/store/effects/getCurrentUser.effect";
import { GetTransactionsEffect } from "./data/store/effects/getTransactions.effect";
import { DataComponent } from "./data/data.component";
import { SharedModule } from "../shared/shared.module";
import { GetUsersEffect } from "./create-transaction/store/effects/getUsers.effect";

@NgModule({
  declarations: [CreateTransactionComponent, MainComponent, DataComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
    StoreModule.forFeature("data", dataReducers),
    StoreModule.forFeature("createTransaction", createTransactionReducers),
    EffectsModule.forFeature([
      GetCurrentUserEffect,
      GetTransactionsEffect,
      GetUsersEffect,
    ]),
  ],
  providers: [MainService],
  exports: [MainComponent],
})
export class MainModule {}
