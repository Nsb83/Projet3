import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../../../../../../providers/user/userProvider';
import { User } from '../../../../../../../models/User';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { MainPage } from '../../../main';
import { ImageProvider } from '../../../../../../../providers/Image/imageProvider';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  user: User;
  userUpdate: User;
  private updateProfil: FormGroup;
  myDate:string;

  
  currentFileUpload: File;
  selectedFiles: FileList;
  progress: { percentage: number } = { percentage: 0 }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private userService : UserProvider, 
    private imageProvider: ImageProvider
    ) {
  }
  userId = this.userService.getUserId();

  ngOnInit() {
  
    this.user = this.userService.getUser();
    this.myDate = this.user.getDateOfBirth()
    this.initForm();
  }

  initForm() {
    this.updateProfil = this.formBuilder.group(
      {
        lastName: ["", Validators.required],
        firstName: ["", Validators.required],
        phone: ["", Validators.required],
        email: ["", Validators.compose([Validators.email, Validators.required])],
        sex: ["", Validators.required],
        dateOfBirth: [""],
      },
    );
  }

  validateForm(updateProfil){
    this.userUpdate = new User(
      updateProfil.lastName,
      updateProfil.firstName,
      updateProfil.phone,
      updateProfil.sex,
      updateProfil.dateOfBirth,
      updateProfil.email,
      // updateProfil.password
    );

    this.userService.updateUser(this.userUpdate).subscribe(() => {
      this.userService.getUser();
    });
  }

  //For uploading image during dev
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  onUpload() {
    this.progress.percentage = 0;
 
    this.currentFileUpload = this.selectedFiles.item(0);
    this.imageProvider.pushFileToStorage(this.userId, this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })

    this.currentFileUpload = undefined;
  }
}
