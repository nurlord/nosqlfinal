import { deleteTweet, likeTweet, postReply } from '@/api/tweets-api';
import { useUser } from '@/lib/auth';
import { Tweet } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Heart,
  HeartOff,
  LoaderCircle,
  MessageCircle,
  Trash2,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { useState } from 'react';

type Props = {
  tweet: Tweet;
};

type Inputs = {
  content: string;
};

export function TweetItem({ tweet }: Props) {
  const user = useUser();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const [isReplyOpened, setReply] = useState(false);
  const [isLiked, setIsLiked] = useState(tweet.isLiked || false);
  const [likeCount, setLikeCount] = useState(tweet._count?.Like || 0);

  const onSubmit = (data: Inputs) => {
    mutation.mutate({ content: data.content, parentId: tweet.id });
    reset();
  };

  const onReply = () => {
    setReply(!isReplyOpened);
  };

  const mutation = useMutation({
    mutationFn: postReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
    },
  });

  const likeMutation = useMutation({
    mutationFn: likeTweet,
    onSuccess: () => {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: likeTweet,
    onSuccess: () => {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
    },
  });

  const handleLikeToggle = () => {
    if (isLiked) {
      unlikeMutation.mutate({ tweetId: tweet.id });
    } else {
      likeMutation.mutate({ tweetId: tweet.id });
    }
  };
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this tweet?')) {
      deleteMutation.mutate({ tweetId: id });
    }
  };
  return (
    <div className='w-full border-b border-gray-200 dark:border-gray-700 sm:px-6 py-4'>
      <div className='flex items-start gap-4'>
        <div className='w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full hidden sm:block'></div>

        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2'>
            <span className='text-sm sm:text-md font-semibold text-gray-900 dark:text-white'>
              {tweet.user.username}
            </span>
            <span className='text-xs sm:text-sm text-gray-500'>
              {new Date(tweet.createdAt).toLocaleTimeString()}
            </span>
            {user.data?.id === tweet.userId && (
              <button
                className='text-gray-400 hover:text-red-500 transition flex items-center justify-center'
                onClick={() => handleDelete(tweet.id)}
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <p className='text-gray-800 dark:text-gray-300 mt-1 text-sm sm:text-md'>
            {tweet.content}
          </p>

          <div className='mt-2 flex items-center gap-4'>
            <button
              className={`flex items-center gap-1 ${
                isLiked ? 'text-red-500' : 'text-gray-500'
              } hover:text-red-600 transition`}
              onClick={handleLikeToggle}
            >
              {isLiked ? <HeartOff size={16} /> : <Heart size={16} />}
              <span className='text-sm'>{likeCount}</span>
            </button>
            <button
              className='flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition'
              onClick={() => onReply()}
            >
              <MessageCircle size={16} />
              <span className='text-sm'>
                {tweet._count?.replies || 0}{' '}
                {tweet._count?.replies === 1 ? 'Reply' : 'Replies'}
              </span>
            </button>
          </div>
          {isReplyOpened && tweet.replies.length ? (
            <div className='block mt-2'>
              {tweet.replies.length > 0 && (
                <div className='mb-3 mt-2 ml-6 space-y-2 border-gray-300 dark:border-gray-700 pl-4'>
                  {tweet.replies.map((reply) => (
                    <div key={reply.id} className='mt-2'>
                      <span className='text-sm font-semibold text-gray-900 dark:text-white'>
                        {reply.user.username}
                      </span>
                      <span className='text-xs p-1 text-gray-500'>
                        {new Date(tweet.createdAt).toLocaleTimeString()}
                      </span>
                      {user.data?.id === reply.userId && (
                        <button
                          className='text-gray-400 hover:text-red-500 transition inline-flex items-center justify-center '
                          onClick={() => handleDelete(reply.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                      <p className='text-gray-800 dark:text-gray-300 text-sm'>
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {user.data ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Textarea
                    {...register('content', { required: true })}
                    className=''
                    required
                  />
                  <Button
                    className='ml-auto block mt-2 '
                    size={'sm'}
                    type='submit'
                    disabled={mutation.isPending}
                  >
                    <div className='flex items-center gap-3'>
                      {mutation.isPending ? (
                        <LoaderCircle className='animate-spin' />
                      ) : (
                        ''
                      )}
                      Reply
                    </div>
                  </Button>
                </form>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
