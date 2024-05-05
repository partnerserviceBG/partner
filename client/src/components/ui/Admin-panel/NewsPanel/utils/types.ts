import { Post } from '@models/Post.ts';

export interface NewsPanelUtilsModalProps {
  open: boolean;
  setOpen: Function;
  news?: Partial<Post>;
}
