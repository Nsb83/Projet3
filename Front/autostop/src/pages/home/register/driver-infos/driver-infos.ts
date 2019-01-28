import { MainPage } from './../../connexion/main/main';
import { ImageProvider } from './../../../../providers/Image/imageProvider';
import { DriverProvider } from './../../../../providers/driver/driverProvider';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Driver } from './../../../../models/Driver';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { MessageProvider } from '../../../../providers/Messages/MessageProvider';
import { TokenStorage } from '../../../../providers/auth/token.storage';
import { UserProvider } from '../../../../providers/user/userProvider';

@Component({
  selector: 'page-driver-infos',
  templateUrl: 'driver-infos.html',
})
export class DriverInfosPage {
  colors: Array<string> = ['#d435a2', '#a834bf', '#6011cf', '#0d0e81', '#0237f1', '#0d8bcd', '#16aca4', '#3c887e', '#157145', '#57a773', '#88aa3d', '#b7990d', '#fcbf55', '#ff8668', '#ff5c6a', '#c2454c', '#c2183f', '#d8226b', '#8f2d56', '#482971', '#000000', '#561f37', '#433835', '#797979','#FFFFFF', '#819595'];
	color: string = '#d435a2';
  private driverInfos: Driver;
  private register: FormGroup;
  private main = MainPage;
  private tokenId;

  currentFileUpload: File;
  selectedFiles: FileList;
  driver:Driver = new Driver();

  constructor(public modal: ModalController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private driverProvider: DriverProvider,
              private messageService: MessageProvider,
              private token: TokenStorage,
              private imageProvider: ImageProvider,
              private userService: UserProvider) { }

  userId = this.userService.getUserId();

  ngOnInit() {
    this.initForm();
    this.driverProvider.getDriver().subscribe((response: any) => {
      this.driver.setBrand(response.driver.brand);
      this.driver.setModel(response.driver.model);
      this.driver.setLicensePlate(response.driver.licensePlate);
      this.driver.setColor(response.driver.color);
    });
  }



  initForm() {
    this.register = this.formBuilder.group(
      {
        brand: ["", Validators.required],
        model: ["", Validators.required],
        color: ["", Validators.required],
        licensePlate: ["", Validators.required],
        imgCar: ["", Validators.required],

      },
    );
  }

  validateForm(register) {
    this.driverInfos = new Driver(
      register.licensePlate,
      register.brand,
      register.model,
      this.color,
    );
    this.driverProvider.updateDriver(this.driverInfos).subscribe(()=>{
      this.messageService.myToastMethod("Votre profil a bien été actualisé")
    }, (error: HttpErrorResponse) => {
      console.log('Error: ', error);
      this.messageService.myToastMethod(`Une erreur est survenue, veuillez réessayer`);
    }
      );
    this.navCtrl.push(this.main);


  }

  prepareColorSelector() {
		setTimeout(() => {
			let buttonElements = document.querySelectorAll('div.alert-radio-group button');
			if (!buttonElements.length) {
				this.prepareColorSelector();
			} else {
				for (let index = 0; index < buttonElements.length; index++) {
					let buttonElement = buttonElements[index];
					let optionLabelElement = buttonElement.querySelector('.alert-radio-label');
					let color = optionLabelElement.innerHTML.trim();

					if (this.isHexColor(color)) {
						buttonElement.classList.add('colorselect', 'color_' + color.slice(1, 7));
						if (color == this.color) {
							buttonElement.classList.add('colorselected');
						}
					}
				}
			}
		}, 100);
	}

  isHexColor(color) {
    let hexColorRegEx = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    return hexColorRegEx.test(color);
  }

  selectColor(color) {
    let buttonElements = document.querySelectorAll('div.alert-radio-group button.colorselect');
    for (let index = 0; index < buttonElements.length; index++) {
      let buttonElement = buttonElements[index];
      buttonElement.classList.remove('colorselected');
      if (buttonElement.classList.contains('color_' + color.slice(1, 7))) {
        buttonElement.classList.add('colorselected');
      }
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onUpload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.imageProvider.pushCarPictureToStorage(this.userId, this.currentFileUpload).subscribe(event => {
      }, (error: HttpErrorResponse) => {
        this.messageService.myToastMethod(`Une erreur est survenue, veuillez réessayer`);
      });
    this.currentFileUpload = undefined;
  }
}
