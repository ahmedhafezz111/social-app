import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { UsersService } from '../../core/services/users/users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  errMsg:string =""

  private readonly usersService = inject(UsersService)
  private readonly router = inject(Router)

  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email:new FormControl(null, [Validators.required ,Validators.email]),
    password:new FormControl(null,  [Validators.required]),
    // password:new FormControl(null,  [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)] ),
    rePassword:new FormControl(null,  [Validators.required]),
    dateOfBirth:new FormControl(null,[Validators.required]),
    gender:new FormControl(null, [Validators.required ,  Validators.pattern(/^(male|female)$/)])
  } , {validators:this.confirmPassword});

  submitForm():void{
    if(this.registerForm.valid){
      this.usersService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
            this.router.navigate(["/login"])
          }
          
        },error:(err:HttpErrorResponse)=>{
          console.log(err.message);
          this.errMsg = err.error.message          
        }
      })
    }else{
      this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }
  }

  confirmPassword(group:AbstractControl){
    const password = group.get('password')?.value
    const rePassword = group.get('rePassword')?.value
    if(password === rePassword ){
      return null
    } else{
      return {mismatch:true}
    }
  }
}
