import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { PaginatedResult } from '../_models/pagination';
import { Post } from '../_models/Post';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/User';

@Injectable()
export class PostsService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getPosts(page?: number, itemsPerPage?: number) {
        const paginatedResult: PaginatedResult<Post[]> = new PaginatedResult<Post[]>();
        let params = new HttpParams();

        if (page != null && itemsPerPage != null) {
            params = params.append('_start', ((page - 1) * itemsPerPage).toString());
            params = params.append('_limit', itemsPerPage.toString());
        }

        return this.http
            .get<Post[]>(this.baseUrl + 'posts', { observe: 'response', params })
            .map(response => {
                if (response.headers.get('Pagination') != null) {
                    paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                }
                return response.body;
            })
            .map(posts => {
                posts.map(post => {
                    this.http.get<User>(`${this.baseUrl}users/${post.userId}`)
                        .subscribe(res => post.userName = res.username);
                });
                return posts;
            })
            .map(response => {
                paginatedResult.result = response;
                return paginatedResult;
            });
    }
}