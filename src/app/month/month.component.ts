import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
    @Input()
    year: number;
    @Input()
    month: number;

    private currentMonth: number;
    private currentYear: number;
    private firstDayOfMonth: Date;
    private lastDayOfMonth: Date;
    public firstWeekOffset: number;
    public daysCount: number;
    public weeksCount: number;
    public weekDays: number[];
    public weeks: number[];
    public monthName: string;
    // public weekDaysNames: string[];

    constructor() {
    }

    ngOnInit() {
        this.currentYear = this.year;
        this.currentMonth = this.month;
        this.redraw();
    }

    private progressiveArray(n) {
        return Array(n).fill(0).map((x, i) => i);
    }

    private redraw() {
        this.firstDayOfMonth = new Date(this.year, this.month, 1);
        this.lastDayOfMonth = new Date(this.year, this.month + 1, 0);
        this.firstWeekOffset = this.firstDayOfMonth.getDay();
        this.daysCount = this.lastDayOfMonth.getDate();
        this.weeksCount = Math.ceil( (this.firstWeekOffset + this.daysCount) / 7);
        this.weekDays = this.progressiveArray(7);
        this.weeks = this.progressiveArray(this.weeksCount);
        this.monthName = this.firstDayOfMonth.toLocaleString('en-us', { month: 'long' });
        // this.weekDaysNames = [
        //     this.firstDayOfMonth.toLocaleString('en-us', { weekday: 'short' }),
        //     this.firstDayOfMonth.toLocaleString('en-us', { weekday: 'short' })
        //     ];
    }

    private isFirstMonth() {
        return this.month === 10 && this.year === 2017;
    }

    private isLastMonth() {
        const displayedMonth = moment([this.year, this.month]).startOf('month');
        const twoMonthsAhead = moment().add(2, 'months').startOf('month');

        return displayedMonth.isSame(twoMonthsAhead);
    }

    private prevMonth() {
        this.month = this.month - 1;
        if (this.month < 0) {
            this.month = 11;
            this.year = this.year - 1;
        }
        this.redraw();
    }

    private nextMonth() {
        this.month = this.month + 1;
        if (this.month > 11) {
            this.month = 0;
            this.year = this.year + 1;
        }
        this.redraw();
    }

}


/*


Weeks start on Sunday

This ought to work even when February doesn't start on Sunday.

function weekCount(year, month_number) {

    // month_number is in the range 1..12

    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil( used / 7);
}
Weeks start on Monday

function weekCount(year, month_number) {

    // month_number is in the range 1..12

    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + 6 + lastOfMonth.getDate();

    return Math.ceil( used / 7);
}


 */