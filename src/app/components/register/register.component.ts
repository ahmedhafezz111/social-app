import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms'
import { UsersService } from '../../core/services/users/users.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  errMsg:string =""

  private readonly usersService = inject(UsersService)
  private readonly router = inject(Router)
  private readonly toastrService = inject(ToastrService)
  validateAge(control: AbstractControl): ValidationErrors | null {
    const birthDate = new Date(control.value);
    const today = new Date();
  
    if (isNaN(birthDate.getTime())) {
      return { invalidDate: true };
    }
  
    if (birthDate > today) {
      return { futureDate: true };
    }
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    if (age < 18) {
      return { underage: true };
    }
  
    return null;
  }

  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email:new FormControl(null, [Validators.required ,Validators.email]),
    password:new FormControl(null,  [Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    // password:new FormControl(null,  [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)] ),
    rePassword:new FormControl(null,  [Validators.required ]),
    dateOfBirth:new FormControl(null,[Validators.required ,this.validateAge]),
    gender:new FormControl(null, [Validators.required ,  Validators.pattern(/^(male|female)$/)])
  } , {validators:this.confirmPassword});

  submitForm():void{
    if(this.registerForm.valid){
      this.usersService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
            this.toastrService.success(res.message,'Linked Posts')
            this.router.navigate(["/login"])
          }
          
        },error:(err:HttpErrorResponse)=>{
          console.log(err.message);
          this.toastrService.error(err.message,'Linked Posts')
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
