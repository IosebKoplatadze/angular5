import { Component, OnInit } from '@angular/core';
import { Album } from '../_models/Album';
import { AlbumsService } from '../_services/albums.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album: Album;
  constructor(private albumsService: AlbumsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => id = params['id']);

    this.albumsService.getAlbum(id)
      .subscribe(album => this.album = album,
        err => {
          if (err.status == 404)
            this.router.navigate(['/albums/']);
        });
  }

}
