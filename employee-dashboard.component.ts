import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';




@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder,private api: ApiService,) { }


  ngOnInit()
  {
    this.formValue = this.formBuilder.group({
      empid: 0,
      fname:[''],
      lname:[''],
      email:[''],
      mobile:[''],
      salary:[''],
    });
    this.getAllEmployee();
  }
  clickAddEmployee()
  {
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails()
  {
    //this.employeeModelObj.empid = this.formValue.value.empid; 
    this.employeeModelObj.fname = this.formValue.value.fname;
    this.employeeModelObj.lname = this.formValue.value.lname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Added Successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong");
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }
  deleteEmployee(row : any)
  {
    this.api.deleteEmployee(row.empid)
    .subscribe(res=>{
      alert("Deleted Successfully");
      this.getAllEmployee();
    })
  }
  onEdit(row:any)
  {
    
    this.formValue.controls['empid'].setValue(row.empid);
    this.formValue.controls['fname'].setValue(row.fname);
    this.formValue.controls['lname'].setValue(row.lname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    this.showAdd=false;
    this.showUpdate=true;
    console.log(row.empid);
    console.log(this.formValue.value.empid);

  }
  updateEmployeeDetails()
  {
    this.employeeModelObj.empid = this.formValue.value.empid; 
    this.employeeModelObj.fname = this.formValue.value.fname;
    this.employeeModelObj.lname = this.formValue.value.lname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    //this.employeeModelObj.id=4;
    console.log(this.employeeModelObj.empid);
    console.log(this.employeeModelObj.fname);

    this.api.updateEmployee(this.employeeModelObj,this.formValue.value.empid)
    .subscribe(res=>{
      console.log(res);
      alert("Updated successfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee(); 
    },
      err=>{
        alert("Something went wrong");
      })
  }
}
