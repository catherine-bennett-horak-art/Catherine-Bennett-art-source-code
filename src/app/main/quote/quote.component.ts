import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import costing from 'src/app/main/quote/costing.json';
import { Quote } from './quote';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  sizes: String[] = [];
  selectedSize: String = "1";
  selectedFrame: String = "";
  frameOptions: String[] = [];
  costingVariable = costing;
  isChosen: boolean = false;
  buttonActive: boolean = false;
  delivery: boolean = false;
  quoteAvailable: boolean = false;
  cost: number = 0;
  baseCost: number = 0;
  totalSubjectPrice: number = 0;
  frameCost: number = 0
  subjects: number = 0
  deliveryString: String = "No delivery"
  deliveryCost: number = 0;
  quotes: Quote[] = [];
  username: string = "";

  ngOnInit(): void {
    this.costingVariable.costing.forEach(element => {
      this.sizes.push(element.size)
    });

  }


  sizeChosen(): void {
    if (document.getElementById('sizeSelect')) {
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

  generateQuote(): void {
    const sizeElement: any = document.getElementById('sizeSelect');
    const numberOfSubjectsElement: any = document.getElementById('numberOfSubjects');
    const frameElement: any = document.getElementById('frameSelect');
    const nameElement: any = document.getElementById('name');
    this.username = nameElement.value;
    this.selectedFrame = frameElement.value;
    const size = this.costingVariable.costing.find(x => x.size === sizeElement.value)
    if (size != null) {
      this.baseCost = size['base-cost'];
      this.subjects = numberOfSubjectsElement.value;
      this.totalSubjectPrice = size['cost-per-additional-figure'] * this.subjects;
      if (size['frame-costs'].find(x => x.description === frameElement.value)?.cost != null) {
        this.frameCost = size['frame-costs'].find(x => x.description === frameElement.value)!.cost;
      }
      console.log(this.delivery)
      this.baseCost = this.baseCost + this.totalSubjectPrice;
      if (this.frameCost != null) {
        if (this.delivery) {
          var totalCost = 0
          if (this.deliveryCost == 0) {
            this.deliveryCost = costing.delivery.cost;
            totalCost = this.baseCost + this.frameCost;
            console.log(totalCost);
            this.quoteAvailable = true;
            this.deliveryString = "Delivery";
            const quote = new Quote(this.selectedSize, this.baseCost, this.subjects, this.selectedFrame, this.frameCost, totalCost);
            this.quotes.push(quote)
            this.cost += totalCost + this.deliveryCost;
          }else {
            this.cost += totalCost;
          }
        } else {
          const totalCost = this.baseCost + this.frameCost;

          const quote = new Quote(this.selectedSize, this.baseCost, this.subjects, this.selectedFrame, this.frameCost, totalCost);
          this.quotes.push(quote)
          this.quoteAvailable = true;
          this.cost += totalCost;
        }
      }
    }

  }

  deliveryToggle(): void {
    this.delivery = !this.delivery
  }

  async generateQuoteDoc(): Promise<void> {
    const existingPdfBytes = await fetch('/assets/blank_quote.pdf').then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Courier)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    //Name Add
    firstPage.drawText(this.username, {
      x: 65,
      y: height - 210,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    })
    var heightValue = height - 340
    this.quotes.forEach(quote => {
      firstPage.drawText(quote.portraitSize + "|" + quote.amountOfSubjects + " Subjects", {
        x: 140,
        y: heightValue,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      })
      firstPage.drawText("R" + quote.baseCost, {
        x: 415,
        y: heightValue,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      })

      heightValue -= 20

      firstPage.drawText(quote.frameChosen + "", {
        x: 140,
        y: heightValue,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      })
      firstPage.drawText("R" + quote.frameCost, {
        x: 415,
        y: heightValue,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      })

      heightValue -= 20
    })
    firstPage.drawText(this.deliveryString + "", {
      x: 140,
      y: heightValue,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    })
    firstPage.drawText("R" + this.deliveryCost, {
      x: 415,
      y: heightValue,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    })

    firstPage.drawText("R" + this.cost, {
      x: 415,
      y: height - 530,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    })

    console.log("height" + height)
    console.log(width)

    const pdfBytes = await pdfDoc.save()
    var blob = new Blob([pdfBytes], { type: 'text/pdf;charset=utf-8' })
    saveAs(blob, this.username+ "Quote.pdf")
    console.log("done")
  }

}
