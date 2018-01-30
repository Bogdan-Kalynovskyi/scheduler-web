import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: []
})
export class HomeComponent implements OnInit {
    public currentMonth: number;
    public currentYear: number;
    public isLoggedIn;

    ngOnInit() {
        const today = new Date();
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        this.isLoggedIn = this.authService.isAuthenticated();
        console.log(this.isLoggedIn);
    }

    constructor( private authService: AuthService) {}
}