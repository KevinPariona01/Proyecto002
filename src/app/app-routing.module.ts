import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { EditIncomeComponent } from './edit-income/edit-income.component';
import { LoginComponent } from './login/login.component';
import { PanelMenuComponent } from './panel-menu/panel-menu.component';
import { RegisterExpensesComponent } from './register-expenses/register-expenses.component';
import { RegisterIncomeComponent } from './register-income/register-income.component';
import { RegistrationExpensesComponent } from './registration-expenses/registration-expenses.component';
import { RegistrationIncomeComponent } from './registration-income/registration-income.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'panel/reports', component: ReportsComponent},
  {path: 'panel/registration-income', component: RegistrationIncomeComponent},
  {path: 'panel/registration-expenses', component: RegistrationExpensesComponent},
  {path: 'panel/register-income', component: RegisterIncomeComponent},
  {path: 'panel/register-expenses', component: RegisterExpensesComponent},
  {path: 'panel/edit-income/:id', component: EditIncomeComponent},
  {path: 'panel/edit-expense/:id', component: EditExpenseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
