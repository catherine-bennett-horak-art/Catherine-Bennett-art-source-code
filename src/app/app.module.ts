import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { QuoteComponent } from './main/quote/quote.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutArtistComponent } from './main/about-artist/about-artist.component';
import { FooterComponent } from './main/footer/footer.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { GalleryModule } from 'ng-gallery';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { WelcomeBlockComponent } from './main/welcome-block/welcome-block.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import {MatGridListModule} from '@angular/material/grid-list';
import { FileSaverModule } from 'ngx-filesaver';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GalleryComponent,
    QuoteComponent,
    AboutArtistComponent,
    FooterComponent,
    WelcomeBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    GalleryModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
    MatGridListModule,
    FileSaverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
