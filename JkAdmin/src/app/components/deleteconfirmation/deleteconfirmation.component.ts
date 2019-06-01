import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetemployeelistService } from 'src/app/services/getemployeelist.service';



@Component({
  selector: 'app-deleteconfirmation',
  templateUrl: './deleteconfirmation.component.html',
  styleUrls: ['./deleteconfirmation.component.css']
})
export class DeleteconfirmationComponent implements OnInit {

  constructor(private dialogref: MatDialogRef<DeleteconfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private httpclient: HttpClient, private getemp: GetemployeelistService) {

  }

  ngOnInit() {
  }

  deleteemp(data) {




    this.httpclient.delete(environment.mainurl + 'api/deleteemp/' + data.emp_id).subscribe((resp) => {


      this.dialogref.close(data.emp_id);



    })

  }

  onclose() {
    this.dialogref.close();

  }

}
