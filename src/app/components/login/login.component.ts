import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
    private readonly toastrService = inject(ToastrService)
  
  
  loginForm:FormGroup = new FormGroup({

    email:new FormControl(null, [Validators.required ,Validators.email]),
    password:new FormControl(null,  [Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),

  });

  submitForm():void{
    if(this.loginForm.valid){
      this.usersService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
            this.toastrService.success(res.message,'Linked Posts')

            localStorage.setItem('socialToken' , res.token)
            this.usersService.saveUserData()
            this.router.navigate(["/timeline"])
          }else{
            this.loginForm.markAllAsTouched()
          }
          
        },error:(err:HttpErrorResponse)=>{
          console.log(err.message);
          this.toastrService.error(err.message,'Linked Posts')
          this.errMsg = err.error.message
        }
      })
    }
  }

}
