import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
<<<<<<< HEAD
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular4-social-login';
=======
>>>>>>> develop

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpsRequestInterceptor } from './modules/interceptor.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MonthComponent } from './month/month.component';
import { AuthComponent } from './auth/auth.component';

import { MonthService } from './services/month.service';
import { AuthService } from './services/auth.service';

<<<<<<< HEAD
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('756043611778-04k29kslqj93sjeuplln1euccrg8ssn4.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

=======
>>>>>>> develop
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MonthComponent,
        AuthComponent
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
      {
        provide: HTTP_INTERCEPTORS, 
        useClass: HttpsRequestInterceptor, 
        multi: true 
      },
      AuthService,
      MonthService
    ]
})
export class AppModule { }


 

 
