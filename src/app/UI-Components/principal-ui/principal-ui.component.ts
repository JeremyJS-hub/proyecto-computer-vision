import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
const { CameraPreview } = Plugins;
import { CameraPreviewOptions } from '@capacitor-community/camera-preview';
import '@capacitor-community/camera-preview';
const cg = require('../../../assets/customGestures');
const handpose = require('@tensorflow-models/handpose');
const fp = require('fingerpose');
const faceLandmarksDetection = require('@tensorflow-models/face-landmarks-detection');

require('@tensorflow/tfjs-backend-webgl');

@Component({
  selector: 'app-principal-ui',
  templateUrl: './principal-ui.component.html',
  styleUrls: ['./principal-ui.component.scss'],
})
export class PrincipalUIComponent implements OnInit {
  private model: any;
  private model2: any;
  private GE: any;
  private estimator: any;
  private estimatedGestures: any;
  private interval: any;
  public divVideoStyle: string =
    'padding: 0; margin: 0%; visibility: visible; width: ' +
    window.screen.width.toString() +
    'px; height: ' +
    (window.screen.height - 130) +
    'px';
  public divButtonsStyle: string =
    'display: block; justify-content: center; margin-left: 75px; margin-right: 75px; text-align: center;';

  public canvasStyle =
    'position: absolute; width: ' +
    window.screen.width.toString() +
    'px; height: ' +
    (window.screen.height - 130) +
    'px';

  constructor(private callNumber: CallNumber) {}

  async ngOnInit() {
    document.getElementById('menu').style.display = '';
    document.querySelectorAll('ion-button').forEach((btn) => {
      btn.disabled = true;
    });
    //load models
    this.model = await handpose.load();
    this.model2 = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
    document.querySelectorAll('ion-button').forEach((btn) => {
      btn.disabled = false;
    });
  }

  public async recognizeFace() {
    if (document.querySelector('video') != null) {
      clearInterval(this.interval);
      this.interval = 0;
      CameraPreview.stop();
    }
    document.querySelectorAll('ion-button')[0].disabled = true;
    //start Camera
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      parent: 'cameraContainer',
      className: 'cameraContainer',
    };

    CameraPreview.start(cameraPreviewOptions).then(() => {
      document.getElementById('video').style.width =
        window.screen.width.toString() + 'px';
      document.getElementById('video').style.height =
        window.screen.height - 130 + 'px';
        document.querySelectorAll('ion-button')[1].disabled = false;

      this.interval = setInterval( async () => {
        const predictions = await this.model2.estimateFaces({
          input: document.querySelector("video")
        });
      
        if(predictions.length > 0){
          console.log(predictions[0])
        }
      }, 100)
    });
  }

  public async recognizeGesture() {
    if (document.querySelector('video') != null) {
      clearInterval(this.interval);
      this.interval = 0;
      CameraPreview.stop();
    }
    document.querySelectorAll('ion-button')[1].disabled = true;
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      parent: 'cameraContainer',
      className: 'cameraContainer',
    };

    CameraPreview.start(cameraPreviewOptions).then(() => {
      document.getElementById('video').style.width =
        window.screen.width.toString() + 'px';
      document.getElementById('video').style.height =
        window.screen.height - 130 + 'px';
        document.querySelectorAll('ion-button')[0].disabled = false;

        this.interval = setInterval(() => {
          this.detectAndEstimateHandGesture();
        }, 500)
    });
  }

  private async detectAndEstimateHandGesture() {
    this.estimator = await this.model.estimateHands(
      document.querySelector('video')
    );
    this.GE = new fp.GestureEstimator([
      cg.default(),
      cg.thumpUpGesture(),
      cg.victoryGesture(),
      cg.callGesture(),
      cg.closedFistGesture(),
    ]);

    if (this.estimator.length > 0) {
      this.estimatedGestures = this.GE.estimate(
        this.estimator[0].landmarks,
        7.5
      );
      if (this.estimatedGestures.gestures[0] != undefined) {
        if (this.estimatedGestures.gestures[0].name === 'thump_up') {
          //Jarol trabaja tu parte aqui
          //console.log(this.estimatedGestures.gestures[0].name);
          this.mensaje_ubicacion();
        } else if (this.estimatedGestures.gestures[0].name === 'victory') {
          //javier trabaja tu parte aqui
          window.open('https://www.youtube.com/watch?v=q-I_wOUz1b0', '_blank');
        } else if (this.estimatedGestures.gestures[0].name === '3Zero') {
          //Eric trabaja tu parte aqui
          console.log(this.estimatedGestures.gestures[0].name);
        } else if (this.estimatedGestures.gestures[0].name === 'call') {
          //Yonaiky trabaja tu parte aqui
          window.open('https://web.facebook.com/?_rdc=1&_rdr', '_blank')
          //console.log(this.estimatedGestures.gestures[0].name);
        } else if (this.estimatedGestures.gestures[0].name === 'closedFist') {
          //Carlos trabaja tu parte aqui
          console.log(this.estimatedGestures.gestures[0].name);
        } else {
          return;
        }
      }
      console.log('hand detected');
    }
  }
  private mensaje_ubicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (datos) {
        console.log(
          'Latitud: ' +
            datos.coords.latitude +
            ' Logitud: ' +
            datos.coords.longitude
        );
        var ubicacion =
          'Latitud: ' +
          datos.coords.latitude +
          ' Logitud: ' +
          datos.coords.longitude;

        const countrycode: string = '1';
        const whatsappnumber: string = '8292644164';

        var url: string =
          'https://wa.me/' +
          countrycode +
          whatsappnumber +
          '?text=Hola me encuentro salvo y seguro, esta es mi ubicacion en coordenadas. ' +
          ubicacion;
        window.open(url, "_blank");
      });
    } else {
      alert(
        'El navegador no acepta la geolocazación o necesita permiso para acceder.'
      );
    }
  }
}
