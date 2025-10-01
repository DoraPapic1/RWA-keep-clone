export class CreateNoteDto {
  title: string;
  content: string;
  color?: string;  
  tagIds?: number[];   
}
