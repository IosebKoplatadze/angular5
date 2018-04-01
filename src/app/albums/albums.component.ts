import { Album } from './../_models/Album';
import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../_services/albums.service';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  userParams: any = {};
  pagination: Pagination = new Pagination();;


  constructor(private albumsService: AlbumsService) { }

  ngOnInit() {
    this.loadAlbums();
  }


  loadAlbums() {
    this.albumsService.getAlbums(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Album[]>) => {
        this.albums = res.result;
        this.pagination.totalItems = res.totalItems;
      });
  }

  pageChanged(event: Pagination): void {
    this.pagination = event;
    this.loadAlbums();
  }
}
