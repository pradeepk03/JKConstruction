import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder ,Validators,FormControl} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {


  signupform: FormGroup;

  msg:any;

  constructor(private formBuilder : FormBuilder, private httpclient : HttpClient,private router : Router) {

    this.signupform = formBuilder.group({

      uname: ['',Validators.required],
      pwd: ['',[Validators.required,Validators.minLength(6)]],
      cpwd: ['',[Validators.required,Validators.minLength(6)]],
      empid: ['', Validators.required],
      usertype:['SA',Validators.required]


    });



   }

  ngOnInit() {




  }

  onsubmit(data): void{



    let inputdata = { //

        'emp_id': data.empid,

        'username': data.uname,

        'password': data.pwd,

        'usertype': data.usertype
         }



    this.httpclient.post(environment.mainurl+ 'api/saveuser', inputdata).subscribe(resp => {

     console.log(resp)

     // this.router.navigate(['login']);
     this.msg= resp['Msg'];





    },err=>{

      this.msg= "Something went wrong .Kindly check the entered details"

    });



  }


}
