import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Todo } from './Todo';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }



  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl, this.httpOptions);
  }

  AddTodo(newTodo: Todo): Observable<Todo>{
    console.log(newTodo);
    return this.http.post<Todo>(`${this.apiUrl}/add-user`, newTodo, this.httpOptions);
  }

  updateTodo(id: any, todo: string): Observable<Todo>{
    return this.http.put<Todo>(`${this.apiUrl}/${id}`,{todo: todo}, this.httpOptions);
  }

  deleteTodo(id: any): Observable<Todo>{
    return this.http.delete<Todo>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  getPaginationItems(page: number, limit: number): Observable<Todo[]>{
    console.log(page,limit);
    return this.http.get<Todo[]>(`${this.apiUrl}/pagination/${page+1}/${limit}`, this.httpOptions);
  }

  getCountTodo(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/count`, this.httpOptions);
  }

}
