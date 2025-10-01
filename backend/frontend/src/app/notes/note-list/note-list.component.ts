import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { RouterModule }      from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Note }              from '../../shared/models/note.model';
import { Tag }               from '../../shared/models/tag.model';
import { NotesService }      from '../notes.service';
import { TagsService }       from '../../tags/tags.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  tags:  Tag[]  = [];
  search = '';
  selectedTagId: number | null = null;
  private routerSub?: Subscription;

  constructor(
    private notesService: NotesService,
    private tagsService: TagsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadTags();
    this.loadNotes();
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.loadNotes();
      });
  }
  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
  loadTags() {
    this.tagsService.getAll().subscribe(tags => this.tags = tags);
  }

  loadNotes() {
    this.notesService
      .list(this.search, this.selectedTagId ?? undefined)
      .subscribe(notes => this.notes = notes);
  }

  onSearchChange(v: string) {
    this.search = v;
    this.loadNotes();
  }

  onTagChange(v: string) {
    this.selectedTagId = v ? +v : null;
    this.loadNotes();
  }
}
