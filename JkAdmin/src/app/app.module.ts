import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes,CanActivate } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { DataTablesModule } from 'angular-datatables';

import { MatTableModule, MatPaginator, MatFormField, MatPaginatorModule, MatFormFieldModule, MatSortHeaderIntl, MatSortModule, MatInputModule, MatProgressSpinnerModule, MatDialogModule } from "@angular/material";
import { AuthguardService as Authguard} from './services/authguard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { SettingComponent } from './components/setting/setting.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { EmployeeResgiterComponent } from './components/employee-resgiter/employee-resgiter.component';
import { EditemployeeComponent } from './components/editemployee/editemployee.component';
import { DeleteemployeeComponent } from './components/deleteemployee/deleteemployee.component';
import { RegisteruserComponent } from './components/registeruser/registeruser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteconfirmationComponent } from './components/deleteconfirmation/deleteconfirmation.component';
import { GetemployeelistService } from './services/getemployeelist.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


export function jwtTokenGetter() {
  return localStorage.getItem('token');
}


export const appRoutes: Routes = [


  {
    path: 'login', component: LoginComponent,

  },


  {
    path: 'index', component: IndexComponent,canActivate:[Authguard],

    children:[

      { path: '', redirectTo: 'index', pathMatch: 'full' },

      { path: 'dashboard', component: DashboardComponent },

      { path : 'employeelist' , component : EmployeelistComponent},

      { path : 'registeremployee' , component : EmployeeResgiterComponent},



      { path : 'editemployee/:empid',component: EditemployeeComponent},

      { path : 'deleteemp/:empid',component: DeleteemployeeComponent},

      {
        path : 'registeruser' , component: RegisteruserComponent,

      }




    ],

    runGuardsAndResolvers: 'always'

  },


  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', redirectTo: '/login', pathMatch: 'full' }








]



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SettingComponent,
    DashboardComponent,
    LoginComponent,
    IndexComponent,
    EditemployeeComponent,
    RegisteruserComponent,
    EmployeelistComponent,
    IndexComponent,
    DeleteemployeeComponent,
    EmployeeResgiterComponent,
    DeleteconfirmationComponent



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    RouterModule.forRoot(
      appRoutes,
      {

        //preloadingStrategy: PreloadAllModules,

        onSameUrlNavigation: "reload"
      }



      //{ enableTracing: true } // <-- debugging purposes only
    ),
    JwtModule.forRoot({
      config: {

        tokenGetter: jwtTokenGetter

        // tokenGetter: () => {
        //   return localStorage.getItem('tokens');
        // }
        //whitelistedDomains: ['localhost:4300'],
       // blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [Authguard,GetemployeelistService],
  bootstrap: [AppComponent],
  entryComponents:[DeleteconfirmationComponent]
})
export class AppModule { }
