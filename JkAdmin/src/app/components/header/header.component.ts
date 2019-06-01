import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  empdata:any;

  constructor() { }

  ngOnInit() {

this.empdata= JSON.parse(localStorage.getItem('userdata'));

console.log(this.empdata)


  }

}
