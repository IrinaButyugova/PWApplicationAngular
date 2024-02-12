import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "./app.component";
import { DateHelperService } from "./services/date-helper.service";
import { StorageService } from "./services/storage.service";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { MainModule } from "./main/main.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthModule,
    MainModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
  providers: [DateHelperService, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
