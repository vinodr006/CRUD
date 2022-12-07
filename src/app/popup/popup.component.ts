import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { SafeValue } from '@angular/platform-browser';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  userForm !: FormGroup;
  actionbtn : String="save"
   
   listofdata = []
  constructor(private formBuilder : FormBuilder, private api :ApiService,
    @Inject(MAT_DIALOG_DATA) public updatedata:any,
    private dialogRef :MatDialogRef<PopupComponent>) { }

  ngOnInit(): void {
    this.userForm =this.formBuilder.group({
      firstname : ['',Validators.required],
      lastname : ['',Validators.required],
      date : ['',Validators.required],
      gender : ['',Validators.required],
    })
    if(this.updatedata){
      this.actionbtn = "update";
      this.userForm.controls['firstname'].setValue(this.updatedata.firstname);
      this.userForm.controls['lastname'].setValue(this.updatedata.lastname);
      this.userForm.controls['date'].setValue(this.updatedata.date);
      this.userForm.controls['gender'].setValue(this.updatedata.gender);
    }
  }
adduser(){
  if(!this.updatedata){
  if(this.userForm.valid){
    this.api.postdata(this.userForm.value)
    .subscribe(
      {
        next:(res)=>{
          this.closepopup()
        },
        error:()=>{
          alert("error while adding the product")
        }
      }
    )
  }
}else{
  this.updateuser()
}
}
updateuser(){
   this.api.updatedata(this.userForm.value)
   .subscribe({
    next:(res)=>{
      alert("updated");
      this.userForm.reset();
      this.dialogRef.close('updated');
    },
    error:()=>{
      alert("error");
    }
   })
}
closepopup(){
  this.dialogRef.close({closedPopup : true});
}
}
