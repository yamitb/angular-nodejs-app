import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  recipe =  {
    milk:1,
    flour:40,
    sugar:30
  }
  available = {
    milk:5,
    flour:120,
    sugar:400,
  }


  constructor() { 
    var resultEnd = this.batches(this.recipe,this.available);
    console.log("resultEnd " + resultEnd);
  }

  ngOnInit() {
  }


  batches(recipe, available){
      var maxResult = Number.MAX_VALUE;     
      for(var key in recipe){
        if(available[key]){
          var result = Math.floor(available[key]/recipe[key]);
          if(result === 0 ){
             return 0;
          }        
          else if(result < maxResult ){
            maxResult = result;
          }
        }else{
          return 0;
        }
      }
       return maxResult;
  }

}
