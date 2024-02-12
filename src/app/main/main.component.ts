import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";

import { DateHelperService } from "../services/date-helper.service";
import { MainService } from "./services/main.service";
import { Paths } from "../paths";
import { TransactionInterface } from "./types/transaction.iterface";
import { FilterModel } from "./filter.model";
import { Observable } from "rxjs";
import { CurrentUserInterface } from "./types/currentUser.interface";
import { Store, select } from "@ngrx/store";
import { currentUserSelector, transactionsSelector } from "./store/selectors";
import { getCurrentUserAction } from "./store/actions/getCurrentUser.action";
import { getTransactionsAction } from "./store/actions/getTransactions.action";

export type SortColumn = "date" | "username" | "amount"; //keyof Transaction;
export type SortDirection = "asc" | "desc";

@Component({
  selector: "main",
  templateUrl: "./main.component.html",
})
export class MainComponent implements OnInit {
  currentUser$!: Observable<CurrentUserInterface | null>;
  transactions$!: Observable<TransactionInterface[] | null>;
  errorMessages = new Array();
  filterModel: FilterModel = new FilterModel();

  sortColumn: SortColumn = "date";
  sortDirection: SortDirection = "desc";
  compare = (v1: string | number | Date, v2: string | number | Date) =>
    v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

  constructor(
    private mainService: MainService,
    private router: Router,
    private dateHelperService: DateHelperService,
    private store: Store
  ) {}

  ngOnInit() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.transactions$ = this.store.pipe(select(transactionsSelector));
    this.store.dispatch(getCurrentUserAction());
    this.store.dispatch(getTransactionsAction());
  }

  public createTransaction() {
    this.router.navigateByUrl(`/${Paths.CreateTransaction}`);
  }

  public repeatTransaction(username: string, amount: number) {
    if (amount < 0) {
      amount = -1 * amount;
    }
    this.router.navigateByUrl(
      `/${Paths.CreateTransaction}?name=${username}&amount=${amount}`
    );
  }

  public sort(sortColumn?: SortColumn) {
    if (sortColumn !== undefined) {
      if (this.sortColumn !== sortColumn || this.sortDirection === "desc") {
        this.sortDirection = "asc";
        this.sortColumn = sortColumn;
      } else {
        this.sortDirection = "desc";
      }
    }

    // this.transactions = [...this.transactions].sort((a, b) => {
    //   const res = this.compare(a[this.sortColumn], b[this.sortColumn]);
    //   return this.sortDirection === "asc" ? res : -res;
    // });
  }

  public filter() {
    // this.mainService
    // .getTransations$()
    // .pipe(
    //   catchError((err) => {
    //     this.errorMessages.push(err.error);
    //     throw err;
    //   })
    // )
    // .subscribe((data: Array<Transaction>) => {
    //   data.forEach(
    //     (a) => (a.date = this.dateHelperService.parseToDate(a.date.toString()))
    //   );
    //   if (
    //     this.filterModel.startDate !== undefined &&
    //     this.filterModel.startDate !== null
    //   ) {
    //     data = data.filter((a) => {
    //       return a.date >= this.filterModel.startDate!;
    //     });
    //   }
    //   if (
    //     this.filterModel.endDate !== undefined &&
    //     this.filterModel.endDate !== null
    //   ) {
    //     data = data.filter((a) => {
    //       return a.date <= this.filterModel.endDate!;
    //     });
    //   }
    //   if (
    //     this.filterModel.name !== undefined &&
    //     this.filterModel.name !== null &&
    //     this.filterModel.name != ""
    //   ) {
    //     data = data.filter((a) => {
    //       return a.username.includes(this.filterModel.name!);
    //     });
    //   }
    //   if (
    //     this.filterModel.startAmount !== undefined &&
    //     this.filterModel.startAmount !== null
    //   ) {
    //     data = data.filter((a) => {
    //       return a.amount >= this.filterModel.startAmount!;
    //     });
    //   }
    //   if (
    //     this.filterModel.endAmount !== undefined &&
    //     this.filterModel.endAmount !== null
    //   ) {
    //     data = data.filter((a) => {
    //       return a.amount <= this.filterModel.endAmount!;
    //     });
    //   }
    //   this.transactions = data;
    //   this.sort();
    // });
  }
}
