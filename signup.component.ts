import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, FormControlName, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      mobile: ['', Validators.required],
      username: ['', Validators.required],
      pswrd: ['', Validators.required],
      usertype: ['', Validators.required],


    });
  }
  signUp() {
    this.api.signUp(this.signupForm.value).subscribe(res => {
      alert(res.message);
      this.signupForm.reset();
      this.router.navigate(['login']);

    }, error => {
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
