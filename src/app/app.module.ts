import { EnvironmentInjector,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { SETTINGS } from '@angular/fire/compat/firestore/'
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';//

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PanelMenuComponent } from './panel-menu/panel-menu.component';
import { ReportsComponent } from './reports/reports.component';
import { RegistrationIncomeComponent } from './registration-income/registration-income.component';
import { RegistrationExpensesComponent } from './registration-expenses/registration-expenses.component';
import { RegisterIncomeComponent } from './register-income/register-income.component';
import { RegisterExpensesComponent } from './register-expenses/register-expenses.component';
import { IncomeExpensesServices } from './services/incomeExpenses.service';
import { EditIncomeComponent } from './edit-income/edit-income.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { HeaderComponent } from './header/header.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { loginService } from './services/login.service';
import { keys } from 'lodash-es';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelMenuComponent,
    ReportsComponent,
    RegistrationIncomeComponent,
    RegistrationExpensesComponent,
    RegisterIncomeComponent,
    RegisterExpensesComponent,
    EditIncomeComponent,
    EditExpenseComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, 'ingresos-egresos'),
    AngularFirestoreModule,
    AngularFireAuthModule,  
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [IncomeExpensesServices, loginService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
