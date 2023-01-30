import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import  costing  from 'src/app/main/quote/costing.json';


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit{
  
  sizes: String[] = [];
  selectedSize : String = "1";
  selectedFrame : String = "";
  frameOptions: String[] = []; 
  costingVariable = costing;
  isChosen: boolean = false;
  buttonActive: boolean = false;
  delivery: boolean = false;
  quoteAvailable: boolean = false;
  cost: number = 0;
  baseCost: number =0;
  totalSubjectPrice : number = 0;
  frameCost : number = 0
  subjects : number = 0
  deliveryString : String = "No delivery"
  deliveryCost: number = 0;

  ngOnInit(): void {
    this.costingVariable.costing.forEach(element => {
      this.sizes.push(element.size)
    });
    
  }


  sizeChosen(): void {
    if(document.getElementById('sizeSelect')){
      const inputElement: any = document.getElementById('sizeSelect');
      this.frameOptions = []
      this.costingVariable.costing.find(x => x.size === inputElement.value)?.['frame-costs'].forEach(element => {
        this.frameOptions.push(element.description);
      }); 
      this.selectedSize = inputElement.value
    }
    this.isChosen = true;
    console.log(this.selectedSize);
  }

  frameChosen(): void {
    this.buttonActive = true
  }

  generateQuote() : void {
    const sizeElement: any = document.getElementById('sizeSelect');
    const numberOfSubjectsElement: any = document.getElementById('numberOfSubjects');
    const frameElement: any = document.getElementById('frameSelect');
    this.selectedFrame = frameElement.value;
    const size = this.costingVariable.costing.find(x => x.size === sizeElement.value)
    if (size != null){
      this.baseCost = size['base-cost'];
      this.subjects = numberOfSubjectsElement.value;
      this.totalSubjectPrice = size['cost-per-additional-figure'] * this.subjects ;
      if( size['frame-costs'].find(x => x.description === frameElement.value)?.cost != null ){
        this.frameCost = size['frame-costs'].find(x => x.description === frameElement.value)!.cost;
      }
      console.log(this.delivery)
      this.baseCost = this.baseCost + this.totalSubjectPrice;
      if(this.frameCost != null){
        if (this.delivery){
          this.deliveryCost  = costing.delivery.cost;
          const totalCost = this.baseCost+ this.frameCost + this.deliveryCost;
          console.log(totalCost);
          this.quoteAvailable = true;
          this.cost = totalCost;
          this.deliveryString = "Delivery";
        } else {
          const totalCost = this.baseCost+ this.frameCost;
          console.log(totalCost);
          this.cost = totalCost;
          this.deliveryString = "No delivery";
          this.deliveryCost = 0;
        }
      }
    }
    
    console.log("generated")
  }

  deliveryToggle() : void {
    this.delivery = !this.delivery
  }

}
