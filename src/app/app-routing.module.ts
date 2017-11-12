import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    // {
    //     path: 'admin',
    //     loadChildren: './admin/admin.module#AdminModule'
    // },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        { enableTracing: true }  // <-- debugging purposes only
        )],
    exports: [RouterModule]
})
export class AppRoutingModule { }