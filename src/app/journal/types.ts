export interface Author {
  id: number;
  name: string | null;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string | null;
  authorId?: number | null;
  user?: Author | null;
  datePosted: Date | null; // Change this to Date | null
}