import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  title: string = "LOGIN";

  constructor(
    private router: Router,
    private loginService: loginService
    ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(['panel/reports']);
      }
    });
  }

  login(){
    this.loginService.login(this.email, this.password).then(res=>{
      this.router.navigate(['panel/reports']);
    }).catch(error=>{
      console.log(error,"error")
      this.router.navigate[('')];
    })
  }
}
