import { Component, OnInit, Input } from '@angular/core';
import { PhotosService } from '../_services/photos.service';
import { Photo } from '../_models/Photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  @Input() albumId: number;
  photos: Photo[];

  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.photosService.getPhotos(this.albumId)
      .subscribe(res => this.photos = res);
  }
}
