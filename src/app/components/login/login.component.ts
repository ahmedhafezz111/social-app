import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errMsg:string =""
 private readonly usersService = inject(UsersService)
  private readonly router = inject(Router)
  
  loginForm:FormGroup = new FormGroup({

    email:new FormControl(null, [Validators.required ,Validators.email]),
    password:new FormControl(null,  [Validators.required] ),

  });

  submitForm():void{
    if(this.loginForm.valid){
      this.usersService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
            localStorage.setItem('socialToken' , res.token)
            this.usersService.saveUserData()
            this.router.navigate(["/timeline"])
          }else{
            this.loginForm.markAllAsTouched()
          }
          
        },error:(err:HttpErrorResponse)=>{
          console.log(err.message);
          this.errMsg = err.error.message
        }
      })
    }
  }

}
