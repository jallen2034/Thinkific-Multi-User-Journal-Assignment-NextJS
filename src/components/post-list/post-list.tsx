import { Post } from "@/app/journal/types";
import {
  Box, Card, CardContent, List, ListItem, Typography
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { formatDate } from "@/components/post-list/helpers";
import './post-list.scss';

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <Box className="post-list-container">
      <List className="post-list">
        {posts.map(({ id, user, title, content, datePosted }: Post) => (
          <ListItem key={id} className="post-item">
            <Card variant="outlined" className="post-card">
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Box display="flex" alignItems="center">
                      <PersonIcon className="author-icon" />
                      <Typography variant="subtitle1" className="post-author">
                        {user?.name}
                      </Typography>
                    </Box>
                    <Typography variant="h6" component="div" className="post-title">
                      {title}
                    </Typography>
                    <Typography variant="body2" className="post-content">
                      {content}
                    </Typography>
                  </Box>
                  <Typography variant="body2" className="post-date" style={{ textAlign: 'right' }}>
                    {datePosted ? formatDate(datePosted) : "Date not available"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default PostList;
