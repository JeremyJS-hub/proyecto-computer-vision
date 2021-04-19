import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { CameraPreview } = Plugins;
import { CameraPreviewOptions } from '@capacitor-community/camera-preview';
import '@capacitor-community/camera-preview';
import { AlertController } from '@ionic/angular';
const faceLandmarksDetection = require('@tensorflow-models/face-landmarks-detection');


// If you are using the WebGL backend:
require('@tensorflow/tfjs-backend-webgl');

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  private model: any;
  private predictions: any;
  public divVideoStyle: string = "padding: 0; margin: 0%; visibility: visible; width: " + window.screen.width.toString() + "px; height: " 
                                 + (window.screen.height - 200).toString() + "px";

  public divButtonsStyle: string = "display: block; justify-content: center; margin-left: 75px; margin-right: 75px";

  public sideMenuStatus: string = 'false';


  constructor(private alertCtrl: AlertController) {
    
  }

  ngOnInit() {
    document.getElementById('menu').style.display = 'none';

    this.chargeFaceRecModelAndCamera();
  }

  private async chargeFaceRecModelAndCamera() {
    //load faceMesh model
    /*this.model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );*/

    //start Camera
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      parent: 'cameraContainer',
      className: 'cameraContainer',
    };

    /*document.getElementById('cameraContainer').style.width = window.screen.width.toString() + 'px';
    document.getElementById('cameraContainer').style.height = window.screen.height.toString() + 'px';*/
    
    CameraPreview.start(cameraPreviewOptions).then(() => {
      document.getElementById('video').style.width = window.screen.width.toString() + 'px';
      document.getElementById('video').style.height = (window.screen.height - 200).toString() + 'px';
      document.getElementById('video').style.padding = '0 25px 0 25px';

      setInterval(
      () => {        
       // return this.detectFace()
      },
      500
    )});
  }

  private async detectFace() {
    this.predictions = await this.model.estimateFaces({
      input: document.querySelector('video')
    });
    
    if(this.predictions.length > 0){
      console.log(this.predictions)
    }
  }

  public signInWithDataAlert(){
    return this.alertCtrl.create(
      {
        header: 'Iniciar Sesion',
        inputs: [
          {
            name: 'email',
            placeholder: 'Correo',
            type: 'email'
          },
          {
            name: 'password',
            placeholder: 'Password',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              return
            }
          },
          {
            text: 'Iniciar Sesion',
            handler: data => {
              console.log(data)
            }
          }
        ]
      }
    ).then(alert => alert.present());
  }
  
}
