import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {

  empid:any;
   empdata:any;
   editemp_formdata:any



  constructor(private http: HttpClient, private actroute : ActivatedRoute,private route : Router,private formbuilder:FormBuilder,private router: Router ) {

    this.actroute.params.subscribe(
      params => this.empid = params['empid']
    );





 // For edit employees form data

   this.editemp_formdata = formbuilder.group({

    usertype: [''],
    site_working: [''],
    address: [''],
    contactno: [''],
    lname:[''],
    fname:[''],
    aadharno:[''],
    empid:['']


  });

  this.http.get(environment.mainurl + 'api/getempbyid/' + this.empid).subscribe(resp =>{

    console.log(' emp data'+ JSON.stringify(resp));
    this.empdata= resp[0];

    //set the form value once response comes

    this.editemp_formdata.controls['usertype'].setValue(this.empdata.usertype);
    this.editemp_formdata.controls['site_working'].setValue(this.empdata.site_working);
    this.editemp_formdata.controls['address'].setValue(this.empdata.address);
    this.editemp_formdata.controls['contactno'].setValue(this.empdata.contactno);
    this.editemp_formdata.controls['lname'].setValue(this.empdata.LastName);
    this.editemp_formdata.controls['fname'].setValue(this.empdata.FirstName);
    this.editemp_formdata.controls['aadharno'].setValue(this.empdata.AadharNo);
    this.editemp_formdata.controls['empid'].setValue(this.empdata.emp_id);


 })

  }

  ngOnInit() {



  }


  onsubmit(data){

    let inputjson={

      'FirstName':data.fname,
      'LastName':data.lname,
      'AadharNo':data.aadharno,
      'usertype':data.usertype,
      'emp_id':data.empid,
      'contactno':data.contactno,
      'site_working':data.site_working,
      'address':data.address
}


    console.log(data);


    this.http.put(environment.mainurl+'api/updateemp/' + this.empdata.emp_id ,inputjson).subscribe(resp=>{

        console.log(JSON.stringify(resp))
        if(resp['Msgcode'] == '110'){

          this.router.navigate(['index/employeelist']);

        }


    })

  }


}
