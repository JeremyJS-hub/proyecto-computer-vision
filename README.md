# proyecto-computer-vision

Ejecute los siguientes comandos para instalar el repositorio:

IMPORTANTE: NO SE VUELE NINGUN PASO

instalar node para los comandos.
instalar primero ionic: npm install -g @ionic/cli

1. git clone https://github.com/JeremyJS-hub/proyecto-computer-vision.git
2. cd proyecto-computer-vision
3. npm config set registry http://registry.npmjs.org/
4. npm i
5. npm i @tensorflow/tfjs-node @tensorflow-models/handpose @capacitor-community/camera-preview 
         @tensorflow-models/face-landmarks-detection --save fingerpose
6. npm run build
7. npx cap sync
8. ionic serve

pdt: trabajen en src/app/UI-Components/principal-ui/principal-ui.component.ts

pdt2: si tienes que usar el movil busca como ejecutar la app en el movil. Y si no, ejecuta ionic serve para ejecutar 
    la app en el navegador, F12 para abrir DevTools del navegador y en la esquina superior derecha clickea el icono
    para mostrar como dispositivo movil y elige Iphone X
