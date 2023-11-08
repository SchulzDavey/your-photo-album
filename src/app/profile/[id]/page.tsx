import prisma from '@/prisma/client';
import FollowButton from './FollowButton';
import { getServerSession } from 'next-auth';
import authOptions from '../../api/auth/[...nextauth]/authOptions';
import { User } from '@prisma/client';
import Link from 'next/link';

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const userSession = await prisma.user.findUnique({
    where: {
      id: (session?.user as User)?.id,
    },
  });

  // console.log(userSession?.Follower);

  // const followers = await prisma.follower.findMany({
  //   where: {
  //     userId: params.id,
  //   },
  //   include: {
  //     user: true,
  //   },
  // });

  const userProfile = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  // // console.log(userSession);
  // // console.log(followers);

  // if (userProfile?.id !== userSession?.id) {
  return (
    <section className="py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-3 items-center">
        <FollowButton userProfile={userProfile!} />
      </div>
    </section>
  );
  // }

  return (
    <section className="py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-3 items-center"></div>
    </section>
  );
};

export default ProfilePage;
