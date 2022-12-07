import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {
  displayedColumns: string[] = ['FirstName', 'LastName', 'Date', 'Gender','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog:MatDialog, private api : ApiService
  ) { }

  ngOnInit(): void {
    this.getAllusers()
  }
  openDialog(){
   let dialogRef = this.dialog.open(PopupComponent,{
    width: '30%'
    });
    dialogRef.afterClosed().subscribe(closedResult =>{
      if(closedResult.closedPopup){
        this.getAllusers()
      }
    })
  }
  edituser(row : any){
    this.dialog.open(PopupComponent,{
      width:'30%',
      data:row
    })
  }

deleteuser(){
this.api.deletedata()
.subscribe({
  next:(res)=>{
  this.getAllusers();
  },
  error:()=>{
  alert("error");
  }
})
}


  getAllusers(){
    this.api.getdata()
    .subscribe(
      {
        next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator =this.paginator;
        this.dataSource.sort = this.sort
        },
        error:(err)=>{
          alert("error while fetching the records!!")
        }
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
