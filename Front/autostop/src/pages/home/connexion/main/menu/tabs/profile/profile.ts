import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../../../../../../providers/user/userProvider';
import { User } from '../../../../../../../models/User';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { MainPage } from '../../../main';
import { ImageProvider } from '../../../../../../../providers/Image/imageProvider';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MessageProvider } from '../../../../../../../providers/Messages/MessageProvider';

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


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private userService : UserProvider, 
    private imageProvider: ImageProvider,
    private messageService: MessageProvider
    ) {
  }
  userId = this.userService.getUserId();

  ngOnInit() {
    this.userService.getUser().subscribe(response => { this.user = response});
    this.myDate = this.user.getDateOfBirth();
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
    );

    this.userService.updateUser(this.userUpdate).subscribe(() => {
      this.userService.getUser();
      this.messageService.myToastMethod("Votre profil a été actualisé")
    }, (error: HttpErrorResponse) => {
      console.log('Error: ', error);
      this.messageService.myToastMethod(`Une erreur est survenue, veuillez réessayer`);
    }
    );
  }

  //For uploading image during dev
  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }
  onUpload() { 
    this.currentFileUpload = this.selectedFiles.item(0);
    this.imageProvider.pushFileToStorage(this.userId, this.currentFileUpload).subscribe(event => {
        console.log('File is completely uploaded!');
      })
    this.currentFileUpload = undefined;
  }
}
