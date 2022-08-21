import { Component, OnInit } from '@angular/core';
import { async } from '@firebase/util';
import { Balance } from '../models/balance.model';
import { Expense } from '../models/expense.model';
import { IncomeExpensesServices } from '../services/incomeExpenses.service';

@Component({
  selector: 'app-register-expenses',
  templateUrl: './register-expenses.component.html',
  styleUrls: ['./register-expenses.component.css']
})
export class RegisterExpensesComponent implements OnInit {

  constructor(private expenseServices: IncomeExpensesServices) { }
  expenses!: Expense[];

  balances: Balance={
    id: '',
    balance: 0
  }

  expense: Expense={
    amount: 0,
    description: '',
    date: new Date
  }

  presentExpenseAmount: number = 0;

  title: string = "Registro de Egresos";

  ngOnInit(): void { 
    this.expenseServices.getExpenses().subscribe((expenses)=>{
      this.expenses = expenses;
    });
    //OBTENCION DE BALANCE
    this.expenseServices.getBalances().subscribe(balance=>{
      this.balances.balance = balance[0]['balance'];
    });
  }  

  deleteExpenses(id:string){
    const llamadaAsync = async ()=>{
      await this.obtenerExpense(id);
      this.presentExpenseAmount = this.expense.amount;
      this.balances.balance = this.balances.balance + this.presentExpenseAmount;
      this.expenseServices.updateBalance(this.balances);
      this.expenseServices.deleteExpense(id);
    } 
    llamadaAsync();
  }

  obtenerExpense(id:string){
    return new Promise((resolve, reject)=>{
        this.expenseServices.getExpense(id).subscribe(expense=>{
          this.expense = expense;
          resolve(this.presentExpenseAmount);
      });
    });
  }


  
  
  
  

}
