import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';
import { Album } from '../_models/Album';
import { User } from '../_models/User';

@Injectable()
export class AlbumsService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAlbums(page?: number, itemsPerPage?: number) {
        let params = new HttpParams();
        const paginatedResult: PaginatedResult<Album[]> = new PaginatedResult<Album[]>();

        if (page != null && itemsPerPage != null) {
            params = params.append('_start', ((page - 1) * itemsPerPage).toString());
            params = params.append('_limit', itemsPerPage.toString());
        }

        return this.http
            .get<Album[]>(this.baseUrl + 'albums', { observe: 'response', params })
            .map(response => {
                if (response.headers.get('x-total-count') != null) {
                    paginatedResult.totalItems = JSON.parse(response.headers.get('x-total-count'));
                }
                paginatedResult.result = response.body;
                return paginatedResult;
            })
            .map(albums => {
                albums.result.map(album => {
                    this.http.get<User>(`${this.baseUrl}users/${album.userId}`)
                        .subscribe(res => album.userName = res.username);

                    let photoCountparams = new HttpParams()
                        .append('_start', '' + 0)
                        .append('_limit', '' + 0);
                    this.http.get<Album[]>(`${this.baseUrl}albums/${album.id}/photos`, { observe: 'response', params: photoCountparams })
                        .subscribe(response => {
                            if (response.headers.get('x-total-count') != null) {
                                album.photosCount = JSON.parse(response.headers.get('x-total-count'));
                            }
                        });
                });
                return albums;
            });
    }

    getAlbum(id: number) {
        return this.http
            .get<Album>(`${this.baseUrl}albums/${id}`);
    }

}