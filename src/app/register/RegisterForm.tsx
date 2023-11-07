'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>();
  const [error, setError] = useState('');
  const router = useRouter();

  const onRegisterHandler = async (data: RegisterProps) => {
    try {
      await axios.post('/api/user/register', data).then((response) => {
        router.push('/login');
      });
    } catch (error: any) {
      console.log('An error has occured: ', error);
      setError(error?.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onRegisterHandler)}>
      <div className="flex flex-col gap-3">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            {...register('name')}
            required
            type="text"
            id="name"
            placeholder="Your Name"
          />
        </div>
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
        <div className="w-full flex justify-between">
          <Button variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="secondary" type="submit">
            Register
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
