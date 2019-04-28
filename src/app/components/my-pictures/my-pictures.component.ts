import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DisplaySettings } from '../../models/DisplaySettings';
import { Image } from '../../models/Image';
import { TryCatchStmt } from '@angular/compiler';

@Component({
  selector: 'app-my-pictures',
  templateUrl: './my-pictures.component.html',
  styleUrls: ['./my-pictures.component.css']
})
export class MyPicturesComponent implements OnInit {
  currentStyle = {};
  @ViewChild('myCanvas') canvas: ElementRef;
  images: Image[];
  context:CanvasRenderingContext2D;
  colors: string[] = ['red','blue','green'];

  displaySettings: DisplaySettings = {
   Sensor: {
    OGEN : 0,
    IKONOS : 0,
    GEOEYE : 0,
    OFEK: 0
   },
   Background: ''
  }
  
  constructor(private DataService : DataService) { }

  ngOnInit() {
    this.DataService.getImages().subscribe( (images : Image[]) => {  
      this.images = images;
    })
   // this.DataService.getImages();
    this.DataService.getDisplaySettings().subscribe( (displaySettings : any) => {  
      for (var i=0 ; i < displaySettings["display-settings"].Sensor.length ; i++){
        this.displaySettings.Sensor[displaySettings["display-settings"].Sensor[i]] = 1;
      }
      this.displaySettings.Background = displaySettings["display-settings"].Background;

      this.loadImages(this.displaySettings.Sensor);
      this.setCurrentStyle(this.displaySettings.Background);
    }) 
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  loadImages(sensors){
    setTimeout(() => {   
     this.images.forEach(image => {
         if(sensors[image.sensor] == 1){
          var imageObj = new Image();        
          var imageName = "assets/img/" + image.name + ".jpg";
          imageObj.src = imageName;
          setTimeout(() => {
           this.context.drawImage(imageObj,image.clipX,image.clipY,image.clipW,image.clipH,image.x,image.y,image.clipW,image.clipH);
         },500);
         } 
     });
    },0);

      //this.context.drawImage(this.myPic.nativeElement,500,0,1000,500,0,30,500,500);
  };

  setCurrentStyle(backgroundColor){
    this.currentStyle = {
    'background-color': backgroundColor
    }
  }

  changeSettings(){
       this.context.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height);
       this.setCurrentStyle(this.displaySettings.Background);
       this.loadImages(this.displaySettings.Sensor);   
  }

}







  // loadImages1(sensors: String[]){
  //   setTimeout(() => {   
  //   for (var i=0 ; i < sensors.length ; i++){
  //      this.images.forEach(image => {
  //         if(image.sensor == this.currentDisplaySettings.Sensor[i]){
  //           this.imagesToPresent.push(image);
  //         }
  //      });
  //    }
  //    this.imagesToPresent.forEach(image => {
  //        var imageObj = new Image();        
  //        var imageName = "assets/img/" + image.name + ".jpg";
  //        //console.log("imageName " + imageName);
  //        imageObj.src = imageName;
  //        setTimeout(() => {
  //         this.context.drawImage(imageObj,image.clipX,image.clipY,image.clipW,image.clipH,image.x,image.y,image.clipW,image.clipH);
  //       },500);
  //    });

  //   },0);
  //     //this.context.drawImage(this.myPic.nativeElement,500,0,1000,500,0,30,500,500);
  // };


