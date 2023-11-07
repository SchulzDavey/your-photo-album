import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import React from 'react';
import authOptions from './api/auth/[...nextauth]/authOptions';
import { User } from '@prisma/client';
import Link from 'next/link';

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  const users = await prisma.user.findMany({
    where: {
      id: {
        not: (session?.user as User).id,
      },
    },
  });

  return (
    <div>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            <Link href={`/profile/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
