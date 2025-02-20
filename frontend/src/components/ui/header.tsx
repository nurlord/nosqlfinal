import { useLogout, useUser } from '@/lib/auth';
import { Button } from './button';
import { useNavigate } from 'react-router';

const Header = () => {
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();
  return (
    <header className=' border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container-wrapper'>
        <div className='container flex h-14 items-center'>
          <div className='mr-4 flex'>
            <a className='mr-4 flex items-center gap-2 lg:mr-6' href='/'>
              <span className='font-bold inline-block'>Scalora</span>
            </a>
            <nav className='flex items-center gap-4 text-sm xl:gap-6'></nav>
          </div>

          <div className='flex flex-1 items-center justify-between gap-2 md:justify-end'>
            {user.isLoading ? (
              <></>
            ) : user.data ? (
              <>
                <span>{user.data.username}</span>
                <Button
                  size='sm'
                  variant={'outline'}
                  onClick={() => logout.mutate({})}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button size='sm' onClick={() => navigate('/auth/login')}>
                  Log in
                </Button>
                <Button
                  size='sm'
                  onClick={() => navigate('/auth/register')}
                  variant={'outline'}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
