import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  images: GalleryItem[] = [];

  ngOnInit() {
    // // Set items array
    // const contentFolder = 'assets';
    //   const fs = require('fs');
    //   fs.readdirSync(contentFolder).forEach((file: any) => {
    //     this.images.push(new ImageItem({ src: file, thumb: 'IMAGE_THUMBNAIL_URL' }),)
    //   });
      
    this.images = [
      new ImageItem({ src: 'assets/cat1.png', thumb: 'assets/cat1.png' }),
      new ImageItem({ src: 'assets/cat2.png', thumb: 'assets/cat2.png' }),
      new ImageItem({ src: 'assets/smilingpeople.jpg', thumb: 'assets/smilingpeople.jpg' }),
      new ImageItem({ src: 'assets/people1.png', thumb: 'assets/people1.png' }),
      new ImageItem({ src: 'assets/child.jpg', thumb: 'assets/child.jpg' }),
      new ImageItem({ src: 'assets/children.jpg', thumb: 'assets/children.jpg' }),
      new ImageItem({ src: 'assets/couple.jpg', thumb: 'assets/couple.jpg' }),
      new ImageItem({ src: 'assets/dog.jpg', thumb: 'assets/dog.jpg' }),
      new ImageItem({ src: 'assets/dog1.jpg', thumb: 'assets/dog1.jpg' }),
      new ImageItem({ src: 'assets/dogs.jpg', thumb: 'assets/dogs.jpg' }),
      new ImageItem({ src: 'assets/elderly-people.jpg', thumb: 'assets/elderly-people.jpg' }),
      new ImageItem({ src: 'assets/kitten.jpg', thumb: 'assets/kitten.jpg' }),
      new ImageItem({ src: 'assets/parentsandchild.jpg', thumb: 'assets/parentsandchild.jpg' })
      
    ];
  }
}
