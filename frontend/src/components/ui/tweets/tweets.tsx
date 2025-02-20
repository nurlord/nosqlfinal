import { getTweets, postTweet } from '@/api/tweets-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TweetItem } from '../tweet';
import { useForm } from 'react-hook-form';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { useUser } from '@/lib/auth';
import { LoaderCircle } from 'lucide-react';

type Inputs = {
  tweet: string;
};
const TweetsComponent = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['tweets'],
    queryFn: () => getTweets(),
  });

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const mutation = useMutation({
    mutationFn: postTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
    },
  });

  const onSubmit = (data: Inputs) => {
    mutation.mutate({ content: data.tweet });
    reset();
  };

  if (error) return <p>Error : {error.message}</p>;
  if (isLoading || user.isLoading)
    return (
      <p className='flex justify-center items-center h-[85vh]'>
        <LoaderCircle className='animate-spin' size={64} />
      </p>
    );
  return (
    <div className=''>
      {!user.data ? (
        <></>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              {...register('tweet', { required: true })}
              className=''
              required
            />
            <Button
              className='ml-auto block mt-2'
              disabled={mutation.isPending}
              type='submit'
            >
              <div className='flex items-center gap-3'>
                {mutation.isPending ? (
                  <LoaderCircle className='animate-spin' />
                ) : (
                  ''
                )}
                Tweet
              </div>
            </Button>
          </form>
          <hr className='w-full my-5' />
        </>
      )}
      {data?.data.map((tweet) => <TweetItem key={tweet.id} tweet={tweet} />)}
    </div>
  );
};

export default TweetsComponent;
