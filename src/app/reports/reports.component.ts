import { Component, OnInit } from '@angular/core';
import { Income } from '../models/income.model';
import { IncomeExpensesServices } from '../services/incomeExpenses.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private reportServices: IncomeExpensesServices) { 
  }

  title: string =  "Reporte de ingresos y egresos";

  incomes: Income[];

  incomeData: Income[];

  expenses: Income[];

  expenseData: Income[];

  view: [number, number] = [700, 400];

  // options INCOME
  showXAxisIncome = true;
  showYAxisIncome = true;
  gradientIncome = true;
  showLegendIncome = true;
  showXAxisLabelIncome = true;
  xAxisLabelIncome = 'Fecha';
  showYAxisLabelIncome = true;
  yAxisLabelIncome = 'Monto';

  // options EXPENSE
  showXAxisExpense = true;
  showYAxisExpense = true;
  gradientExpense = true;
  showLegendExpense = true;
  showXAxisLabelExpense = true;
  xAxisLabelExpense = 'Fecha';
  showYAxisLabelExpense = true;
  yAxisLabelExpense = 'Monto';



  ngOnInit(): void {

    const llamadaAsync = async () =>{
      await this.getIncomes();
      await this.getExpenses();
    }
    llamadaAsync();
  }

  getIncomes(){
    return new Promise((resolve, reject) =>{
      this.reportServices.getIncomes().subscribe((incomes)=>{
        this.incomes = incomes;
        resolve(this.incomes);
      });
    });
  }
  getExpenses(){
    return new Promise((resolve, reject) =>{
      this.reportServices.getExpenses().subscribe((expenses)=>{
        this.expenses= expenses;
        resolve(this.incomes);
      });
    });
  }


  ShowIncome(){
    this.modificarKeyIncome();
    this.incomeData = this.incomes;
  }

  ShowExpense(){
    this.modificarKeyExpense();
    this.expenseData = this.expenses;
  }

  modificarKeyIncome(){
    this.incomes = this.incomes.map(function(obj) {
      obj['value'] = obj['amount'];
      obj['name'] = obj['date'];
      delete obj['amount']; // Delete old key
      delete obj['date'];
      return obj;
    });
  }

  modificarKeyExpense(){
    this.expenses = this.expenses.map(function(obj) {
      obj['value'] = obj['amount'];
      obj['name'] = obj['date'];
      delete obj['amount']; // Delete old key
      delete obj['date'];
      return obj;
    });
  }

  
}
