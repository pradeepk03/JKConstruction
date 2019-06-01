import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-resgiter',
  templateUrl: './employee-resgiter.component.html',
  styleUrls: ['./employee-resgiter.component.css']
})
export class EmployeeResgiterComponent implements OnInit {


  emp_regform:FormGroup;

  error: any;

  constructor(private formBuilder:FormBuilder,private httpclient:HttpClient,private router : Router) {

    this.emp_regform = formBuilder.group({

      fname: ['',Validators.required],
      lname: ['',Validators.required],
      contactno: ['',[Validators.required,Validators.maxLength(10)]],
      empid: ['',[Validators.required,Validators.minLength(1)]],
      aadharno: ['', Validators.required],
      utype:['',Validators.required],
      site_working:['',Validators.required],
      address:['',Validators.required],
      profilepic:['']

    });


   }

  ngOnInit() {
  }

  onsubmit(data){

    console.log('data here'+JSON.stringify(data));

    let inputdata={

      'FirstName': data.fname,
      'LastName': data.lname,
      'AadharNo': data.aadharno,
      'usertype': data.utype,
      'emp_id': data.empid,

      'contactno': data.contactno,
      'intime':'',
      'outtime':'',
      'site_working':data.site_working,
      'address':data.address

    }

    this.httpclient.post(environment.mainurl+ 'api/saveemployees', inputdata).subscribe(resp => {

      console.log(resp)

     if(resp['Msgcode']=='100'){ // employee added

       this.router.navigate(['./index/employeelist']);
     }

    },err =>{

      this.error = "Something went wrong .Kindly check the Value entered once again"

  }


  );


}


onfileselected(event){

  if(event.target.files.length > 0){

  const profile = event.target.files[0];
  this.emp_regform.get('profilepic').setValue(profile);


  }

}

}
