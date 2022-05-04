export interface Post {
  id: number|undefined|null;
  title: string;
  content: string;
  code: string|null;
  creationDate: string|undefined|null;
  lastUpdateDate: string|undefined|null;
  userId: number|undefined|null;
  forumId: number;
}
