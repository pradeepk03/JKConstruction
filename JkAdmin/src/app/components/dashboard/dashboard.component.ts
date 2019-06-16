import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GetemployeelistService } from 'src/app/services/getemployeelist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  empdata: any;

  incount = 0;

  outcount = 0;

  absent = 0;

  constructor(private httpclient: HttpClient,private emplist:GetemployeelistService) { }

  ngOnInit() {

    this.emplist.getemp().subscribe((resp) => {
      console.log(JSON.stringify(resp));
      this.empdata = resp;

       for (let i = 0; i < this.empdata.length; i++){

        console.log(Date.parse(this.empdata[i].intime) == null)

        if (Date.parse(this.empdata[i].intime) != NaN && (Date.parse(this.empdata[i].intime) < Date.parse(this.empdata[i].outtime)  ))
             this.incount++;
        else if (Date.parse(this.empdata[i].intime) == NaN  ) {

          this.absent++;

        } else {

          this.outcount++;

        }



       }

       console.log("this incount" + this.incount)


  });

  }

}
