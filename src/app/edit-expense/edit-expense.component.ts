import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Balance } from '../models/balance.model';
import { Expense } from '../models/expense.model';
import { IncomeExpensesServices } from '../services/incomeExpenses.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {

  id:string = '';

  balances: Balance={
    id: '',
    balance: 0
  }

  expense: Expense={
    id: '',
    amount: 0,
    description: '',
    date: new Date,
  }

  pastExpenseAmount:  number = 0;

  title:string = "Editar Egreso "

  constructor(
    private expenseServices: IncomeExpensesServices,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    //OBTENCION DE BALANCE
    this.expenseServices.getBalances().subscribe(balance=>{
      this.balances.balance = balance[0]['balance'];
    });
    const llamadaAsync =async () => {
      this.id = this.route.snapshot.params['id'];
      await this.getExpense();
      //OBTENCION DE PAST EXPENSE AMOUNT
      this.pastExpenseAmount = this.expense.amount;
    }
    llamadaAsync();
  }

  editExpense(expense: Form){
    this.balances.balance = this.balances.balance + this.pastExpenseAmount - this.expense.amount;
    this.expenseServices.editExpense(this.expense);
    this.expenseServices.updateBalance(this.balances);
    this.router.navigate(['panel/register-expenses']);
  }

  getExpense(){
    return new Promise((resolve, reject)=>{
      this.expenseServices.getExpense(this.id).subscribe(expense=>{
        this.expense = expense;
        resolve(this.expense)
      });
    });
  }

}
