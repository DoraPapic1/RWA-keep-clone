import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

import { NotesService }      from '../notes.service';
import { Note }              from '../../shared/models/note.model';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="note">
      <h2>{{ note.title }}</h2>
      <div [style.background]="note.color">{{ note.content }}</div>
      <span *ngFor="let t of note.tags">{{ t.name }}</span>
      <div>
        <a [routerLink]="['/notes', note.id, 'edit']">Edit</a>
        <button (click)="delete()">Delete</button>
      </div>
    </div>
  `
})
export class NoteDetailComponent implements OnInit {
  note!: Note;
  noteId!: number;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.noteId = +this.route.snapshot.paramMap.get('id')!;
    this.notesService.get(this.noteId)
      .subscribe(n => this.note = n);
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.notesService.delete(this.noteId)
        .subscribe(() => this.router.navigate(['/notes']));
    }
  }
}
