import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { CameraPreview } = Plugins;
import { CameraPreviewOptions } from '@capacitor-community/camera-preview';
import '@capacitor-community/camera-preview';
const cg = require('../../../assets/customGestures');
const handpose = require('@tensorflow-models/handpose');
const fp = require('fingerpose');
require('@tensorflow/tfjs-backend-webgl');

@Component({
  selector: 'app-principal-ui',
  templateUrl: './principal-ui.component.html',
  styleUrls: ['./principal-ui.component.scss'],
})
export class PrincipalUIComponent implements OnInit {
  private model: any;
  private GE: any;
  private estimator: any;
  private estimatedGestures: any;
  public divVideoStyle: string =
    'padding: 0; margin: 0%; visibility: visible; width: ' +
    window.screen.width.toString() +
    'px; height: ' +
    window.screen.height.toString() +
    'px';
  constructor() {}

  ngOnInit() {
    document.getElementById('menu').style.display = '';
    this.chargeFaceRecModelAndCamera();
  }

  private async chargeFaceRecModelAndCamera() {
    //load handpose model
    this.model = await handpose.load();

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
        window.screen.height.toString() + 'px';

      setInterval(() => {
        return this.detectAndEstimateHandGesture();
      }, 300);
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
          this.mensaje_ubicacion();
        } else if (this.estimatedGestures.gestures[0].name === 'victory') {
          //javier trabaja tu parte aqui
          window.open("https://www.youtube.com/watch?v=q-I_wOUz1b0");
          //console.log(this.estimatedGestures.gestures[0].name);
        } else if (this.estimatedGestures.gestures[0].name === '3Zero') {
          //Eric trabaja tu parte aqui
          //console.log(this.estimatedGestures.gestures[0].name);
        } else if (this.estimatedGestures.gestures[0].name === 'call') {
          //Yonaiky trabaja tu parte aqui
          //console.log(this.estimatedGestures.gestures[0].name);
        } else if (this.estimatedGestures.gestures[0].name === 'closedFist') {
          //Carlos trabaja tu parte aqui
          //console.log(this.estimatedGestures.gestures[0].name);
        } else {
          return;
        }
      }
      //console.log('hand detected');
    }
  }

  mensaje_ubicacion(){
    if (navigator.geolocation) {

          navigator.geolocation.getCurrentPosition(

            function (datos) {
              console.log("Latitud: "+datos.coords.latitude + " Logitud: " + datos.coords.longitude);
              var ubicacion = "Latitud: "+datos.coords.latitude + " Logitud: " + datos.coords.longitude;

              const countrycode:string="1";
              const whatsappnumber:string="8297691568";

              var url:string="https://wa.me/"+countrycode+whatsappnumber+"?text=Hola me encuentro salvo y seguro, esta es mi ubicacion en coordenadas. "+ubicacion;
              window.open(url,);
            }
          );
      } else {
          alert("El navegador no acepta la geolocazación o necesita permiso para acceder.");
      }
    }
}
