import { NgModule }                  from '@angular/core';
import { BrowserModule }             from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }          from '@angular/common/http';

import { AppRoutingModule }          from './app-routing.module';

import { AppComponent }              from './app.component';
import { NoteListComponent }         from './notes/note-list/note-list.component';
import { NoteEditorComponent }       from './notes/note-editor/note-editor.component';
import { NoteDetailComponent }       from './notes/note-detail/note-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteEditorComponent,
    NoteDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
