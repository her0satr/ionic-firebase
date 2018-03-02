import { Component } from '@angular/core';
import { AlertController  } from 'ionic-angular';
import { storage } from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  images: Array<{src: String}>;
  
  constructor(
    private camera: Camera,
    private alertCtrl: AlertController) {
    
    // set array image
    this.images = [];
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
      console.log(err);
    });
  }
}
