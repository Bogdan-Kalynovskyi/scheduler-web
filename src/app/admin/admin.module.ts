import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { routing } from './admin-routing.module';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing
    ],
    declarations: [DashboardComponent]
})
export class AdminModule {}
