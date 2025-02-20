import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLogin } from '@/lib/auth';
import { useNavigate } from 'react-router';

type Inputs = {
  login: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const loginUser = useLogin();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    loginUser.mutate(data);
    if (!loginUser.isError) {
      navigate('/');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email or username below to login to your account
          </CardDescription>
          {loginUser.isError && (
            <span className='text-red-500 text-sm'>
              Incorrect login or password
            </span>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='login'>Login</Label>
                <Input
                  {...register('login', { required: true })}
                  id='login'
                  type='text'
                />
                {errors.login && (
                  <span className='text-red-500 text-xs'>
                    This field is required
                  </span>
                )}
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  {...register('password', { required: true })}
                  id='password'
                  type='password'
                />
                {errors.password && (
                  <span className='text-red-500 text-xs'>
                    This field is required
                  </span>
                )}
              </div>
              <Button type='submit' className='w-full'>
                Login
              </Button>
            </div>

            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <a href='./register' className='underline underline-offset-4'>
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
