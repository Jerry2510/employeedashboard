import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  // public loginObj=new UserModel();
  constructor(private formBuilder : FormBuilder,private http: HttpClient,private router: Router ,private api: ApiService){}

  ngOnInit()
  {
     this.loginForm=this.formBuilder.group({
      userName: ['',Validators.required],
      pswrd: ['',Validators.required],

     });
    
  }
  login()
  {
    //  console.log(this.loginForm.value.userName);
    //   console.log(this.loginForm.value.pswrd);
    //   this.loginObj .UserName=this.loginForm.value.userName;
    //   this.loginObj.pswrd=this.loginForm.value.pswrd;
      // console.log("Login Obj",this.loginObj)
      this.api.login(this.loginForm.value)
      .subscribe(res=>{
        alert(res.message);
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      },error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400 && error.error && error.error.errors) {
            const validationErrors = error.error.errors;
            const errorMessages = [];
  
            // Iterate over each validation error
            for (const fieldName in validationErrors) {
              if (validationErrors.hasOwnProperty(fieldName)) {
                const fieldErrors = validationErrors[fieldName];
                // Iterate over each error message for the field
                for (const error of fieldErrors) {
                  // Build the error message
                  const errorMessage = `${fieldName}: ${error}`;
                  // Push the error message to the array
                  errorMessages.push(errorMessage);
                }
              }
            }
  
            // Display the error messages to the user
            alert('Validation errors occurred:\n' + errorMessages.join('\n'));
          } else {
            // Handle other types of errors
            console.error('An error occurred:', error);
          }
        } else {
          console.error('An error occurred:', error);
        }
      })
      
       
      }
      
}




