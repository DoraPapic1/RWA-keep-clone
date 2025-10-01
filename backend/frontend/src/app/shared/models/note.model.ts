import { Tag } from './tag.model';

export interface Note {
  id:      number;
  title:   string;
  content: string;
  color:   string;
  tags:    Tag[];
}
