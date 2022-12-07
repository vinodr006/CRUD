import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  list = [
    {
      number : '1',
      name:'home',

    },
    {
      number : '2',
      name:'RFI',
      routerLink:'userdetails'
    },
    {
      number : '3',
      name:'construction',

    },
    {
      number : '4',
      name:'Details',

    },
    {
      number : '5',
      name:'Payment',

    },
    {
      number : '6',
      name:'order',

    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
