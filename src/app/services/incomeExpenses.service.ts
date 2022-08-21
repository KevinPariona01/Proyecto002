import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Income } from "../models/income.model";
import { map } from "rxjs/operators"
import { Expense } from "../models/expense.model";
import { Balance } from "../models/balance.model";

@Injectable()
export class IncomeExpensesServices{
    incomeColection!: AngularFirestoreCollection<Income>;
    incomeDoc!: AngularFirestoreDocument<Income> ;
    incomes!: Observable<Income[]>
    income!: Observable<Income>;
    expenseColection!: AngularFirestoreCollection<Expense>;
    expenseDoc!: AngularFirestoreDocument<Expense> ;
    expenses!: Observable<Expense[]>
    expense!: Observable<Expense>;
    balanceColection!: AngularFirestoreCollection<Balance>;
    balanceDoc!: AngularFirestoreDocument<Balance> ;
    balances!: Observable<Balance[]>
    balance!: Observable<Balance>;

    constructor(private db: AngularFirestore){
        this.incomeColection = db.collection('Income', ref =>
            ref.orderBy('date','asc')
        )
        this.expenseColection = db.collection('Expenses', ref =>
            ref.orderBy('date','asc')
        )
        this.balanceColection = db.collection('balance', ref =>
            ref.orderBy('balance','asc')
        )
    }

    //OBTENER LISTA DE INGRESOS
    getIncomes(): Observable<Income[]>{
        this.incomes = this.incomeColection.snapshotChanges().pipe(
            map(cambios=>{
                return cambios.map(accion=>{
                    const datos = accion.payload.doc.data() as Income;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.incomes;
    }

    //OBTENER LISTA DE GASTOS
    getExpenses(): Observable<Expense[]>{
        this.expenses = this.expenseColection.snapshotChanges().pipe(
            map(cambios=>{
                return cambios.map(accion=>{
                    const datos = accion.payload.doc.data() as Expense;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.expenses;
    }

    //OBTENER BALANCES
    getBalances(): Observable<Balance[]>{
        this.balances = this.balanceColection.snapshotChanges().pipe(
            map(cambios=>{
                return cambios.map(accion=>{
                    const datos = accion.payload.doc.data() as Balance;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.balances;
    }

    //AÑADIR INGRESO
    addIncome(income: Income){
        this.incomeColection.add(income);
    }

    //AÑADOR GASTO
    addExpense(expense: Expense){
        this.expenseColection.add(expense);
    }

    //OBTENER DATOS PARA EDITAR DE INCOME
    getIncome(id:string){
        this.incomeDoc = this.db.doc<Income>(`Income/${id}`);
        this.income = this.incomeDoc.snapshotChanges().pipe(
        map( accion => {
            if(accion.payload.exists===false){
            return null;
            }
            else{
                const datos = accion.payload.data() as Income;
                datos.id = accion.payload.id;
                return datos as any;
            }
        }));
        return this.income;
    }

    //EDITAR INCOME
    editIncome(income:Income){
        this.incomeDoc = this.db.doc(`Income/${income.id}`);
        this.incomeDoc.update(income);
    }
    
    //OBTENER DATOS PARA EDITAR EXPENSE
    getExpense(id:string){
        this.expenseDoc = this.db.doc<Expense>(`Expenses/${id}`);
        this.expense = this.expenseDoc.snapshotChanges().pipe(
            map( accion => {
                if(accion.payload.exists===false){
                    return null;
                }
                else{
                    const datos = accion.payload.data() as Expense;
                    datos.id = accion.payload.id;
                    return datos as any;
                }
            }));
            return this.expense;
    }

    //EDITAR EXPENSE
    editExpense(expense: Expense){
        this.expenseDoc = this.db.doc(`Expenses/${expense.id}`);
        this.expenseDoc.update(expense);
    }

    //BORRAR INCOME
    deleteIncome(id:string){
        this.incomeDoc = this.db.doc(`Income/${id}`);
        this.incomeDoc.delete();
    }

    //BORRAR EXPENSE
    deleteExpense(id:string){
        this.expenseDoc = this.db.doc(`Expenses/${id}`);
        this.expenseDoc.delete();
    }

    //ACTUALIZAR BALANCE
    updateBalance(balance: Balance){
        this.balanceDoc = this.db.doc(`balance/0`);
        this.balanceDoc.update(balance)
    }

}
