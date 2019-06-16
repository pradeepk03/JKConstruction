import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import {MatTableDataSource, MatPaginator, MatSort,MatDialog,MatDialogConfig, MatSelectModule} from '@angular/material';
import { DeleteconfirmationComponent } from '../deleteconfirmation/deleteconfirmation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-getempworkdone',
  templateUrl: './getempworkdone.component.html',
  styleUrls: ['./getempworkdone.component.css']
})
export class GetempworkdoneComponent implements OnInit {

  public  emp: any;
  dataSource:any;
  empid:any;
  earningsfilter='ALL';

displayedColumns: string[] = ['emp_id', 'FirstName', 'LastName', 'usertype','AadharNo','workdone','date','site_working','supervisor_id'];
//  dataSource = new MatTableDataSource<any>(this.emp);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  constructor(private http: HttpClient, private actroute : ActivatedRoute,private route : Router,private formbuilder:FormBuilder,private router: Router ) {

    this.actroute.params.subscribe(
      params => this.empid = params['empid']
    );
    }
  ngOnInit() {
    
    this.getearningsbyid();
    
  }

  getearningsbyid(){

    this.http.get(environment.mainurl + 'api/empearnings/' + this.empid).subscribe(resp =>{

      this.dataSource = new MatTableDataSource();
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      

  })


}
}