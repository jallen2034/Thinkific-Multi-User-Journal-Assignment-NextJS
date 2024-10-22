import { Post } from "@/app/journal/types";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <ul>
      {posts.map((post: Post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>By: {post.author?.name || "Unknown"}</small>
        </li>
      ))}
    </ul>
  );
};

export default PostList;