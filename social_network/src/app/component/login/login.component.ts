import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";
import {SignInForm} from "../../model/SignInForm";
import {AuthService} from "../../service/auth.service";
import {TokenService} from "../../service/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  status = '* Username or password is not correct! Please Try Again *';
  isLogin = false;
  // @ts-ignore
  signInForm: SignInForm;

  constructor(private matDialog: MatDialog, private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {

  }


  openRegister(): void {
    const dialogRef = this.matDialog.open(RegisterComponent, {
      role: 'dialog',
      height: '480px',
      width: '480px'
    });
  }

  ngSubmit() {
    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
    );
    // @ts-ignore
    this.authService.signIn(this.signInForm).subscribe(data => {
      if (data.token != undefined) {
        this.tokenService.setToken(data.token);
        // @ts-ignore
        this.tokenService.setUser(JSON.stringify(data.users));
        console.log(data)
        this.router.navigate(['home']);
      } else {
        this.isLogin = true;
        this.status = '* Username or password is not correct! Please Try Again *';
      }
    });
  }
}
