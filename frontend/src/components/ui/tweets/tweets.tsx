import { getTweets } from '@/api/tweets-api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TweetItem } from '../tweet';
import { useForm } from 'react-hook-form';
import { Button } from '../button';
import { Textarea } from '../textarea';

type Inputs = {
  tweet: string;
};
const TweetsComponent = () => {
  // const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['tweets'],
    queryFn: () => getTweets(),
  });

  const { register, handleSubmit } = useForm<Inputs>();
  const mutation = useMutation({
    mutationFn: postTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  const onSubmit = (data: Inputs) => {
    console.log(data);
  };
  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className=''>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          {...register('tweet', { required: true })}
          className=''
          required
        />
        <Button className='ml-auto block mt-2 ' type='submit'>
          Tweet
        </Button>
      </form>
      <hr className='w-full my-5' />
      {data?.data.map((tweet) => <TweetItem key={tweet.id} tweet={tweet} />)}
    </div>
  );
};

export default TweetsComponent;
