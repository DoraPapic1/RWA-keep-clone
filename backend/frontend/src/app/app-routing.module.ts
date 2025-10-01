import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoteListComponent }     from './notes/note-list/note-list.component';
import { NoteEditorComponent }   from './notes/note-editor/note-editor.component';
import { NoteDetailComponent }   from './notes/note-detail/note-detail.component';

const routes: Routes = [
  { path: '',                component: NoteListComponent },
  { path: 'notes/new',       component: NoteEditorComponent },
  { path: 'notes/:id',       component: NoteDetailComponent },
  { path: 'notes/:id/edit',  component: NoteEditorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
