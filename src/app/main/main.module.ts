import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { MainService } from './main.service';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule],
    providers: [MainService]
})

export class MainModule {}