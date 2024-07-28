import fetch from 'node-fetch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import BreadcrumbsNav from '../../../components/Breadcrumbs';
import { Post } from '../../../types';
import { fetchPost } from '@/utils/fetchers';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  let post: Post | null = null;
  let error: string | null = null;

  try {
    post = await fetchPost(id);
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <PostDetail post={post} error={error} />
  );
}

interface PostDetailProps {
  post: Post | null;
  error: string | null;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, error }) => {
  if (error) {
    return <Typography variant="h4">{error}</Typography>;
  }

  if (!post) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <BreadcrumbsNav category={post.category.name} postTitle={post.title} />
      <Paper sx={{ padding: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1">
          {post.content}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          By {post.session.username}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(post.createdAt!).toLocaleDateString()}
        </Typography>
      </Paper>
    </Box>
  );
};