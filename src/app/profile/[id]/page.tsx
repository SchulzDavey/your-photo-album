import prisma from '@/prisma/client';
import FollowButton from './FollowButton';
import { getServerSession } from 'next-auth';
import authOptions from '../../api/auth/[...nextauth]/authOptions';
import { User } from '@prisma/client';

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const userSession = await prisma.user.findUnique({
    where: {
      id: (session?.user as User)?.id,
    },
    include: {
      Follower: true,
    },
  });
  const userProfile = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <section className="py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-3 items-center">
        <FollowButton userSession={userSession} userProfile={userProfile!} />
      </div>
    </section>
  );
};

export default ProfilePage;
