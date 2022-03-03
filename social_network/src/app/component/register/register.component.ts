import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SignUpForm} from "../../model/SignUpForm";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  // @ts-ignore
  signUpForm: SignUpForm;
  isCheckSuccess = false;
  status = 'Please fill in the form to register';

  error1: any = {
    message: "nouser"
  }
  error2: any = {
    message: "noemail"
  }
  success: any = {
    message: "yes"
  }
  constructor(public dialogRef: MatDialogRef<RegisterComponent>,private authService: AuthService,) { }

  ngOnInit(): void {
  }

  ngSubmit(){
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    )
    console.log('signUpForm === ',this.signUpForm)
    this.authService.signUp(this.signUpForm).subscribe(data =>{
      console.log('data == ', data)
      if(JSON.stringify(data)==JSON.stringify(this.error1)){
        this.status = 'The username is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'The email is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.isCheckSuccess = true;
        this.authService.setData(true);
        alert('Creat Success! Login now')
        window.location.reload();
      }
    })
  }

}
