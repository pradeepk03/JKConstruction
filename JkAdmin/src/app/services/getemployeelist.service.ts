import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetemployeelistService {

  constructor(private http : HttpClient) { }


getemp(){


  return this.http.post(environment.mainurl + 'api/getemp',{});
}

}
