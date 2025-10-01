// src/app/notes/note-editor/note-editor.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { NotesService } from '../notes.service';
import { TagsService } from '../../tags/tags.service';
import { Tag } from '../../shared/models/tag.model';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css']
})
export class NoteEditorComponent implements OnInit {
  form: FormGroup;
  tags: Tag[] = [];
  noteId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private tagsService: TagsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: new FormControl(''),
      content: new FormControl(''),
      color: new FormControl('#ffffff'),
     
      tagIds: new FormControl<number[]>([])
    });
  }

  ngOnInit() {
    this.tagsService.getAll().subscribe({
      next: tags => {
        this.tags = tags;
        console.log('Tags loaded:', tags);
      },
      error: err => {
        console.error('Failed loading tags', err);
      }
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noteId = +id;
      this.notesService.get(this.noteId).subscribe({
        next: n => {
          const ids = Array.isArray(n.tags) ? n.tags.map(t => t.id) : [];
          this.form.patchValue({
            title: n.title,
            content: n.content,
            color: n.color ?? '#ffffff',
            tagIds: ids
          });
        },
        error: err => console.error('Failed loading note', err)
      });
    }
  }

  onTagToggle(tagId: number, checked: boolean) {
    const current: number[] = this.form.controls['tagIds'].value ?? [];
    let next: number[];
    if (checked) {
      next = Array.from(new Set([...current, tagId]));
    } else {
      next = current.filter(id => id !== tagId);
    }
    this.form.controls['tagIds'].setValue(next);
  }

  onSubmit() {
    if (this.form.invalid) {
      console.warn('Form invalid', this.form.value);
      return;
    }

    const raw = this.form.value as {
      title: string;
      content: string;
      color: string;
      tagIds: (string | number)[];
    };

    const dto = {
      title: raw.title,
      content: raw.content,
      color: raw.color,
      tagIds: (raw.tagIds || []).map(id => Number(id))
    };

    console.log('Submitting DTO:', dto);
    this.loading = true;

    const op = this.noteId
      ? this.notesService.update(this.noteId, dto)
      : this.notesService.create(dto);

    op.subscribe({
      next: res => {
        console.log('Save successful:', res);
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Save failed', err);
        this.loading = false;
        alert('Save failed: ' + (err.message || 'unknown error'));
      }
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
