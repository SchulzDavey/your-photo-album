'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export type LoginProps = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginProps>();
  const [error, setError] = useState('');

  const onLoginHandler = async (data: LoginProps) => {
    await signIn('credentials', {
      ...data,
      redirect: true,
      callbackUrl: '/gallery',
    }).then((response) => {
      if (response?.error) {
        setError(response.error);
        console.log('An error has occurred: ' + response.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onLoginHandler)}>
      <div className="flex flex-col gap-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register('email')}
            required
            type="email"
            id="email"
            placeholder="Your email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            {...register('password')}
            required
            type="password"
            id="password"
            placeholder="Your Password"
          />
        </div>
        <div>
          <p>{error ? error : ''}</p>
        </div>
        <div className="flex flex-row justify-between">
          <Button variant="secondary">
            <Link href="/register">Register</Link>
          </Button>
          <Button variant="secondary" type="submit">
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
