import { Comment } from './../_models/Comment';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommentsService {

    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
    getComments(postId: number) {
        return this.http
            .get<Comment[]>(`${this.baseUrl}posts/${postId}/comments`);
    }
}