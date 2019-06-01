import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  constructor(private jwthelper: JwtHelperService)
    { }

  public verifyroute(): boolean{



    const token = localStorage.getItem('token');

    console.log(!helper.isTokenExpired(token))



    // Check whether the token is expired and return
    // true or false
    return !helper.isTokenExpired(token);


  }

}
