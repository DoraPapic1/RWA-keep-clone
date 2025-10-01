import { Routes } from '@angular/router';
import { NoteListComponent }   from './notes/note-list/note-list.component';
import { NoteEditorComponent } from './notes/note-editor/note-editor.component';
import { NoteDetailComponent } from './notes/note-detail/note-detail.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      { path: 'notes',          component: NoteListComponent },
      { path: 'notes/new',      component: NoteEditorComponent },
      { path: 'notes/:id',      component: NoteDetailComponent },
      { path: 'notes/:id/edit', component: NoteEditorComponent },
      { path: '', redirectTo: 'notes', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'notes' }
];
