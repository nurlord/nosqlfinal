import { api } from '@/lib/axios';
import { Tweet } from '@/types/api';
export const getTweets = (): Promise<{ data: Tweet[] }> => {
  return api.get('tweets');
};

type PostTweetProps = {
  content: string;
};

interface PostReplyProps extends PostTweetProps {
  parentId: string;
}
type LikeTweetProps = {
  tweetId: string;
};

export const postTweet = ({
  content,
}: PostTweetProps): Promise<{ data: Tweet }> => {
  return api.post('tweets', {
    content,
  });
};

export const postReply = ({
  content,
  parentId,
}: PostReplyProps): Promise<{ data: Tweet }> => {
  return api.post('tweets', {
    content,
    parentId,
  });
};

export const likeTweet = ({
  tweetId,
}: LikeTweetProps): Promise<{ data: Tweet }> => {
  return api.post('likes', {
    tweetId,
  });
};

export const deleteTweet = ({ tweetId }: LikeTweetProps): Promise<boolean> => {
  return api.delete(`tweets/${tweetId}`);
};
