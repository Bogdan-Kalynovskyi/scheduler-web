import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './admin.component';
import { routing } from './admin-routing.module';

@NgModule({
    imports: [
        CommonModule,
        HttpClient,
        routing
    ],
    declarations: [DashboardComponent]
})
export class AdminModule {}
