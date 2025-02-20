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
import { RegisterInput, useRegister } from '@/lib/auth';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>();

  const registerUser = useRegister();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    registerUser.mutate(data);
    if (!registerUser.isError) {
      navigate('/login');
    }
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign up</CardTitle>
          <CardDescription>
            Enter your email and username below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  {...register('email', { required: true })}
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                />
                {errors.email && (
                  <span className='text-red-500 text-xs'>
                    This field is must be valid email
                  </span>
                )}
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  {...register('username', { required: true })}
                  id='username'
                  type='text'
                  required
                />
                {errors.username && (
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
                  required
                />
                {errors.password && (
                  <span className='text-red-500 text-xs'>
                    Password must be minimum 5 characters
                  </span>
                )}
              </div>
              <Button type='submit' className='w-full'>
                Sign up
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <a href='./login' className='underline underline-offset-4'>
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
