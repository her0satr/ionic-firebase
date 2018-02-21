import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  user = {} as User;
  images: Array<{src: String}>;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private alertCtrl: AlertController,
    private storage: Storage) {
    
    // set array image
    this.images = [];
    
    // check if user exists
    this.storage.get('user_login').then((val) => {
      if (val != null) {
        this.user = JSON.parse(val);
      }
    });
  }

  takePhoto() {
    try {
      // capture image
      const cameraParam: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(cameraParam).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;

        // upload it
        const pictures = storage().ref('pictures');
        pictures.putString(base64Image, 'data_url').then((result) => {
          let alert = this.alertCtrl.create({
            title: result.state,
            subTitle: 'Uploaded a base64url string!',
            buttons: ['Dismiss']
          });
          alert.present();
        });
      });
    }
    catch(e) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: e,
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  takePhotoGit() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.images.unshift({
       src: base64Image
     })
    }, (err) => {
     // Handle error
    });
  }

  signOut() {
    this.storage.remove('user_login').then(() => {
      this.navCtrl.push(LoginPage);
    });
  }
}
