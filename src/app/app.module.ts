import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular4-social-login';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpsRequestInterceptor } from './modules/interceptor.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MonthComponent } from './month/month.component';
import { AuthComponent } from './auth/auth.component';

import {AuthGuard
//    CategoryService, TagService, QuestionService
} from './services/auth-guard';

import { AuthenticationService} from './services/authentication.service';

import { UserService } from './services/user.service';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('756043611778-04k29kslqj93sjeuplln1euccrg8ssn4.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MonthComponent,
        AuthComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SocialLoginModule
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthenticationService, AuthGuard,
      {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      },
      { 
        provide: HTTP_INTERCEPTORS, 
        useClass: HttpsRequestInterceptor, 
        multi: true 
      },
      UserService
    ]
})
export class AppModule { }


 

 
