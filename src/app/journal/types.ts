export interface Author {
  id: number;
  name: string | null;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string | null;
  authorId: number | null;
  author: Author | null;
}