
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../shared/models/note.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private baseUrl = 'http://localhost:3000/api/notes';

  constructor(private http: HttpClient) {}

  list(search?: string, tagId?: number): Observable<Note[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (tagId !== undefined) params = params.set('tagId', String(tagId));
    return this.http.get<Note[]>(this.baseUrl, { params });
  }

  get(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/${id}`);
  }

  create(payload: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, payload);
  }

  update(id: number, payload: Partial<Note>): Observable<Note> {
    return this.http.patch<Note>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
