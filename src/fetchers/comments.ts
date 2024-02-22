import { SiteComment } from '@/models/comment';
import { _fetch } from '.';

export const fetchComments = async () => {
  const commentData = await _fetch<SiteComment[]>('/api/comments');
  const gotComments = Object.values(commentData.data);
  return gotComments;
};
