import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { MainComponent } from './main.component';
import { Paths } from '../paths';

const routes: Routes = [
    {
        path: "",
        component: MainComponent
    },
    {
        path: Paths.CreateTransaction,
        component: CreateTransactionComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}