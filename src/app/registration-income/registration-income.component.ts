import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Balance } from '../models/balance.model';
import { Income } from '../models/income.model';
import { IncomeExpensesServices } from '../services/incomeExpenses.service';

@Component({
  selector: 'app-registration-income',
  templateUrl: './registration-income.component.html',
  styleUrls: ['./registration-income.component.css']
})
export class RegistrationIncomeComponent implements OnInit {

  balances: Balance={
    id: '',
    balance: 0
  }

  income: Income={
    amount: 0,
    description: '',
    date: new Date
  }

  title: string = "Registrar Ingreso"

  constructor(
    private incomeServices:IncomeExpensesServices,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.incomeServices.getBalances().subscribe(balance=>{
      this.balances.balance = balance[0]['balance'];
    });
  }

  guardarDatos(){
    this.balances.balance = this.income.amount + this.balances.balance;
    this.incomeServices.addIncome(this.income);
    this.incomeServices.updateBalance(this.balances)
    this.income.amount = 0
    this.income.description = ''
    this.income.date = new Date
  }
}
