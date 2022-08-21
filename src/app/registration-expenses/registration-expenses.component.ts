import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Balance } from '../models/balance.model';
import { Expense } from '../models/expense.model';
import { IncomeExpensesServices } from '../services/incomeExpenses.service';

@Component({
  selector: 'app-registration-expenses',
  templateUrl: './registration-expenses.component.html',
  styleUrls: ['./registration-expenses.component.css']
})
export class RegistrationExpensesComponent implements OnInit {

  balances: Balance={
    id: '',
    balance: 0
  }
  
  expense: Expense={
    amount: 0,
    description: '',
    date: new Date
  }

  title: string = "Registrar Egreso"

  constructor(
    private expenseServices: IncomeExpensesServices,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.expenseServices.getBalances().subscribe(balance=>{
      this.balances.balance = balance[0]['balance'];
    });
  }

  guardarDatos(){
    this.balances.balance = this.balances.balance - this.expense.amount;
    this.expenseServices.addExpense(this.expense);
    this.expenseServices.updateBalance(this.balances)
    this.expense.amount = 0
    this.expense.description = ''
    this.expense.date = new Date
  }

}
