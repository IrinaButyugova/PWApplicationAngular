import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { MainService } from './main.service';

@NgModule({
    declarations: [
        CreateTransactionComponent,
        MainComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MainRoutingModule],
    providers: [MainService]
})

export class MainModule {}