import { MainPage } from './../../../main';
import { ChoicePage } from './../../../../../register/choice/choice';
import { DriverProvider } from '../../../../../../../providers/driver/driverProvider';
import { Driver } from './../../../../../../../models/Driver';
import { Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { UserProvider } from '../../../../../../../providers/user/userProvider';
import { MessageProvider } from '../../../../../../../providers/Messages/MessageProvider';
import { TokenStorage } from '../../../../../../../providers/auth/token.storage';
import { ImageProvider } from '../../../../../../../providers/Image/imageProvider';

@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage implements OnInit{
  colors: Array<string> = ['#d435a2', '#a834bf', '#6011cf', '#0d0e81', '#0237f1', '#0d8bcd', '#16aca4', '#3c887e', '#157145', '#57a773', '#88aa3d', '#b7990d', '#fcbf55', '#ff8668', '#ff5c6a', '#c2454c', '#c2183f', '#d8226b', '#8f2d56', '#482971', '#000000', '#561f37', '#433835', '#797979','#FFFFFF', '#819595'];
	color: string = '#d435a2';
  private driverInfos: Driver;
  private register: FormGroup;
  private main = MainPage;
  private tokenId;

  currentFileUpload: File;
  selectedFiles: FileList;
  driver:Driver;

  constructor(public modal: ModalController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private driverProvider: DriverProvider,
              private messageService: MessageProvider,
              private token: TokenStorage,
              private imageProvider: ImageProvider,
              private userService: UserProvider) { }

  userId = this.userService.getUserId();

  ngOnInit() {
    this.initForm();
    this.driver = this.driverProvider.getDriver();
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
      // { validator: this.passwordControl("password", "passwordConfirmation") }
    );
  }

  validateForm(register) {
    this.driverInfos = new Driver(
      register.licensePlate,
      register.brand,
      register.model,
      this.color,
    );
    this.messageService.myAlertMethod("Bienvenue !", "Vous êtes désormais connecté en tant que conducteur. Recherchez votre trajet et prennez du monde sur votre trajet.", false);
    this.driverProvider.updateDriver(this.driverInfos).subscribe(()=>{});
    this.navCtrl.push(this.main);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiclePage');
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

	setColor(color) {
		console.log('Selected Color is', color);
	}

    //For uploading image during dev
    selectFile(event) {
      this.selectedFiles = event.target.files;
    }
    onUpload() {
      this.currentFileUpload = this.selectedFiles.item(0);
      this.imageProvider.pushCarPictureToStorage(this.userId, this.currentFileUpload).subscribe(event => {
          console.log('File is completely uploaded!');
        })
      this.currentFileUpload = undefined;
    }
}
