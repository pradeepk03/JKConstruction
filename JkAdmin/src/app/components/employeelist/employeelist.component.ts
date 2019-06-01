import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import {MatTableDataSource, MatPaginator, MatSort,MatDialog,MatDialogConfig} from '@angular/material';
import { DeleteconfirmationComponent } from '../deleteconfirmation/deleteconfirmation.component';
import { GetemployeelistService } from 'src/app/services/getemployeelist.service';



@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']

})
export class EmployeelistComponent implements OnInit {


public  emp: any;
dataSource:any;

displayedColumns: string[] = ['FirstName', 'LastName', 'Empid', 'contactno','AadharNo','usertype','site_working','address','edit','delete'];
//  dataSource = new MatTableDataSource<any>(this.emp);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


constructor(private httpclient: HttpClient,private dialog:MatDialog,private emplist: GetemployeelistService) {



}

ngOnInit() {

  //this.dataSource.paginator = this.paginator;
 // this.dataSource.sort = this.sort;

 this.getemplist();

}

delete(data){



const dialogRef =  this.dialog.open(DeleteconfirmationComponent,{

    width:'250px',
    data:{empdata:data}
  });

  dialogRef.afterClosed().subscribe(result => {

      this.getemplist();

  })

}




// deleteemp(id){

//   this.httpclient.delete(environment.mainurl + 'api/deleteemp/' + id).subscribe((resp)=>{

//    this.getemplist();

//   })


//}



getemplist(){

  this.emplist.getemp().subscribe((resp)=>{

    this.dataSource = new MatTableDataSource();
        this.dataSource.data = resp;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

},err=>{
  console.log("error hai")
});




}




}
