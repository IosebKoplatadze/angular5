import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Todo } from '../_models/Todo';
import { PaginatedResult } from '../_models/pagination';

@Injectable()
export class TodosService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getTodos(page?: number, itemsPerPage?: number) {
        let params = new HttpParams();
        const paginatedResult: PaginatedResult<Todo[]> = new PaginatedResult<Todo[]>();

        if (page != null && itemsPerPage != null) {
            params = params.append('_start', ((page - 1) * itemsPerPage).toString());
            params = params.append('_limit', itemsPerPage.toString());
        }

        return this.http
            .get<Todo[]>(`${this.baseUrl}todos`, { observe: 'response', params })
            .map(response => {
                if (response.headers.get('x-total-count') != null) {
                    paginatedResult.totalItems = JSON.parse(response.headers.get('x-total-count'));
                }
                paginatedResult.result = response.body;
                return paginatedResult;
            });
    }

    updateTodo(todo: Todo) {
        return this.http
            .put<Todo>(`${this.baseUrl}todos/${todo.id}`, todo);
    }

    addTodo(todo: Todo) {
        return this.http
            .post<Todo>(`${this.baseUrl}todos`, todo);
    }

    deleteTodo(todoId: number) {
        return this.http
            .delete<Todo>(`${this.baseUrl}todos/${todoId}`);
    }
}