import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Balance } from '../models/balance.model';
import { Income } from '../models/income.model';
import { IncomeExpensesServices } from '../services/incomeExpenses.service';

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.css']
})
export class EditIncomeComponent implements OnInit {

  id:string = '';

  balances: Balance={
    id: '',
    balance: 0
  }

  income: Income={
    id: '',
    amount: 0,
    description: '',
    date: new Date,
  }

  pastIncomeAmount:  number = 0;

  title: string = "Editar Ingreso"

  constructor(
    private incomeServices: IncomeExpensesServices, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    //OBTENCION DE BALANCE
    this.incomeServices.getBalances().subscribe(balance=>{
      this.balances.balance = balance[0]['balance'];
    });
    const llamadaAsync =async () => {
      this.id = this.route.snapshot.params['id'];
      await this.getIncome();
      //OBTENCION DE PAST INCOME AMOUNT
      this.pastIncomeAmount = this.income.amount;
    }
    llamadaAsync();
  }

  editIncome(income: Form){
    this.balances.balance = this.balances.balance - this.pastIncomeAmount + this.income.amount;
    this.incomeServices.editIncome(this.income);
    this.incomeServices.updateBalance(this.balances);
    this.router.navigate(['panel/register-income']);
  }

  getIncome(){
    return new Promise((resolve, reject)=>{
      this.incomeServices.getIncome(this.id).subscribe(income=>{
        this.income = income;
        resolve(this.income)
      });
    });
  }

   
  
   
}
