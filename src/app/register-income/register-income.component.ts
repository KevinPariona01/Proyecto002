import { Component, OnInit } from '@angular/core';
import { Balance } from '../models/balance.model';
import { Income } from '../models/income.model';
import { IncomeExpensesServices } from '../services/incomeExpenses.service';


@Component({
  selector: 'app-register-income',
  templateUrl: './register-income.component.html',
  styleUrls: ['./register-income.component.css']
})
export class RegisterIncomeComponent implements OnInit {
  

  constructor(private incomeServices: IncomeExpensesServices) { }
  incomes!: Income[];

  balances: Balance={
    id: '',
    balance: 0
  }

  income: Income={
    amount: 0,
    description: '',
    date: new Date
  }

  presentIncomeAmount: number = 0;

  title:string = 'Registro de Ingresos'
  
  ngOnInit(): void {
    this.incomeServices.getIncomes().subscribe((incomes)=>{
      this.incomes = incomes;
    });
    //OBTENCION DE BALANCE
    this.incomeServices.getBalances().subscribe(balance=>{
      this.balances.balance = balance[0]['balance'];
    });
  }

  deleteIncome(id:string){
    const llamadaAsync = async ()=>{
      await this.obtenerIncome(id);
      this.presentIncomeAmount = this.income.amount;
      this.balances.balance = this.balances.balance - this.presentIncomeAmount;
      this.incomeServices.updateBalance(this.balances);
      this.incomeServices.deleteIncome(id);
    } 
    llamadaAsync();
  }

  obtenerIncome(id:string){
    return new Promise((resolve, reject)=>{
        this.incomeServices.getIncome(id).subscribe(income=>{
          this.income = income;
          resolve(this.presentIncomeAmount);
      });
    });
  }
  

}
