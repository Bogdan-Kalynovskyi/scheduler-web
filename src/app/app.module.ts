import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpsRequestInterceptor } from './modules/interceptor.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MonthComponent } from './month/month.component';
import { AuthComponent } from './auth/auth.component';

import { AuthGuard } from './services/auth-guard';
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MonthComponent,
        AuthComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,
    ],
    bootstrap: [AppComponent],
    providers: [
      AuthGuard,
      {
        provide: HTTP_INTERCEPTORS, 
        useClass: HttpsRequestInterceptor, 
        multi: true
      },
      AuthService,
    ]
})
export class AppModule { }


 

 
