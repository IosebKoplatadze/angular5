import { Photo } from './../_models/Photo';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotosService {

    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
    getPhotos(albumId: number) {
        return this.http
            .get<Photo[]>(`${this.baseUrl}albums/${albumId}/photos`);
    }

}