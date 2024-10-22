import { Post } from "@/app/journal/types";
import {
  Box, Button, Card, CardActions, CardContent, List, ListItem, Typography
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import './post-list.scss';

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <Box className="post-list-container">
      <List className="post-list">
        {posts.map((post: Post) => (
          <ListItem key={post.id} className="post-item">
            <Card variant="outlined" className="post-card">
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PersonIcon className="author-icon" />
                  <Typography variant="subtitle1" className="post-author">
                    {post.author?.name}
                  </Typography>
                </Box>
                <Typography variant="h6" component="div" className="post-title">
                  {post.title}
                </Typography>
                <Typography variant="body2" className="post-content">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Read More</Button>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PostList;
