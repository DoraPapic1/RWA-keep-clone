// src/app/tags/tags.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../shared/models/tag.model';

@Injectable({ providedIn: 'root' })
export class TagsService {
  private base = 'http://localhost:3000/api/tags';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.base);
  }
}
