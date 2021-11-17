import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { MainService } from './main.service';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [MainRoutingModule],
    providers: [MainService]
})

export class MainModule {}