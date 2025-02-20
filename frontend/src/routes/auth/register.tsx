import { RegisterForm } from '@/components/ui/form/register-form';
import { useUser } from '@/lib/auth';
import { useNavigate } from 'react-router';

export default function RegisterRoute() {
  const user = useUser();
  const navigate = useNavigate();
  if (user.data) {
    navigate('/');
  }
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <RegisterForm />
      </div>
    </div>
  );
}
