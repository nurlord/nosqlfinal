import { api } from '@/lib/axios';
import { Tweet } from '@/types/api';
export const getTweets = (): Promise<{ data: Tweet[] }> => {
  return api.get('tweets');
};
