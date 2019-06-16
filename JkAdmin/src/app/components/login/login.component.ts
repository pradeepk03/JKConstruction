import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms'
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup;

  loginresp: any;

  constructor(private formBuilder: FormBuilder,private httpclient:HttpClient,private router:Router){

    this.loginform = formBuilder.group({
      username: ['',Validators.required],
      pass:['',Validators.required],
      empid:['',Validators.required]



    });


  }


  ngOnInit(): void {

    localStorage.clear()
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

   // this.singupform.valueChanges.subscribe(console.log(""))


  }

  onsubmit(data):void{

   
    let inputdata ={

      username:data.username,

      password:data.pass,

      emp_id:data.empid
    }

    console.log("data"+JSON.stringify(inputdata))



    this.httpclient.post(environment.mainurl +  'api/login', inputdata).subscribe(resp => {

     console.log(resp)



    if(resp['Msgcode']=='103' && resp['userdata']['usertype']=='SA'){ // succesfull login

      localStorage.setItem('userdata',JSON.stringify(resp));

      localStorage.setItem('token',resp['token']);

      this.router.navigate(['index/dashboard']);
    }else{

      this.loginresp=resp['Msg']

      console.log(" error hua bhai")
    }


    },err=>{

      console.log(err);

      this.loginresp = err['error']['Msg']

    }


    ) ;


    ///logout




}

}
