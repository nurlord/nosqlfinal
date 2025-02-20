import { Tweet } from '@/types/api';

type Props = {
  tweet: Tweet;
};

export function TweetItem({ tweet }: Props) {
  return (
    <div className='w-full border-b border-gray-200 dark:border-gray-700 sm:px-6 py-4'>
      <div className='flex items-start gap-4'>
        {/* Avatar */}
        <div className='w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full hidden sm:block'></div>

        {/* Tweet Content */}
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <span className='text-sm sm:text-md font-semibold text-gray-900 dark:text-white'>
              {tweet.user.username}
            </span>
            <span className='text-xs  sm:text-sm text-gray-500'>
              {new Date(tweet.createdAt).toLocaleTimeString()}
            </span>
          </div>

          <p className='text-gray-800 dark:text-gray-300 mt-1 text-sm sm:text-md '>
            {tweet.content}
          </p>
        </div>
      </div>
    </div>
  );
}
