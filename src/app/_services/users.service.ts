import { User } from './../_models/User';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }
    getUsers() {
        return this.http
            .get<User[]>(`${this.baseUrl}Users`);
    }
}