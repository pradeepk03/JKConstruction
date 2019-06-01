import { Injectable } from '@angular/core';
import { AuthservicesService } from './authservices.service';
import { Router, CanActivate,ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private auth: AuthservicesService,private router : Router) {

   }


   canActivate(route:ActivatedRouteSnapshot) : boolean{


    console.log(" in can activate"+this.auth.verifyroute())


      if(!this.auth.verifyroute()){


        this.router.navigate(['/login']);
        return false;

      }

      return true;
   }


}
