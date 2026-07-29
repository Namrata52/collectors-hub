export type Comment = {
  id: number;
  author: string;
  handle: string;
  avatar: string;
  text: string;
};
export interface Post {
  id: number;
  author: string;
  handle: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  category: string;
  createdAt: string;
  body:string;
}
