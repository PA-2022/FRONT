
export interface IContent {
  id: number|undefined|null;
  content: string;
  postId: number|null;
  type: number;
  position: number;
}

export class Content implements IContent {
  id: number|undefined|null;
  content: string;
  postId: number|null;
  type: number;
  position: number;

  constructor(id: number|undefined|null, content: string, postId: number|null, type: number, position: number) {
    this.id = id;
    this.content = content;
    this.postId = postId;
    this.type = type;
    this.position = position;
  }
}

