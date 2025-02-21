import Header from '@/components/ui/header';
import { useParams } from 'react-router';

const ProfileRoute = () => {
  const { id } = useParams();

  return (
    <div className='border-border border px-5 mx-auto max-w-[1500px] min-h-[90vh]'>
      <Header />
      <div className='container py-4'>
        <p>User ID: {id}</p>
      </div>
    </div>
  );
};

export default ProfileRoute;
