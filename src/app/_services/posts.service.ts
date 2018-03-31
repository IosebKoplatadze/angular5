import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Post } from '../_models/Post';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/User';
import { PaginatedResult } from '../_models/pagination';

@Injectable()
export class PostsService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getPosts(page?: number, itemsPerPage?: number) {
        let params = new HttpParams();
        const paginatedResult: PaginatedResult<Post[]> = new PaginatedResult<Post[]>();

        if (page != null && itemsPerPage != null) {
            params = params.append('_start', ((page - 1) * itemsPerPage).toString());
            params = params.append('_limit', itemsPerPage.toString());
        }

        return this.http
            .get<Post[]>(this.baseUrl + 'posts', { observe: 'response', params })
            .map(response => {
                if (response.headers.get('x-total-count') != null) {
                    paginatedResult.totalItems = JSON.parse(response.headers.get('x-total-count'));
                }
                paginatedResult.result = response.body;
                return paginatedResult;
            })
            .map(posts => {
                posts.result.map(post => {
                    this.http.get<User>(`${this.baseUrl}users/${post.userId}`)
                        .subscribe(res => post.userName = res.username);
                });
                return posts;
            });
    }

    getPost(id: number) {
        return this.http
            .get<Post>(`${this.baseUrl}posts/${id}`);
    }

    updatePost(post: Post) {
        return this.http
            .put<Post>(`${this.baseUrl}posts/${post.id}`, post);
    }

    addPost(post: Post) {
        return this.http
            .put(`${this.baseUrl}posts`, post);
    }
}