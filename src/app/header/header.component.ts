import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Balance } from '../models/balance.model';
import { IncomeExpensesServices } from '../services/incomeExpenses.service';
import { loginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  balances: Balance[]

  isLoggedIn: boolean;
  loggedInUser: string;

  @Input() title: string;

  constructor(
    private balanceServices: IncomeExpensesServices,
    private loginService: loginService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.balanceServices.getBalances().subscribe(balance =>{
      this.balances = balance;
    });
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false;
      }
    });
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }

}
