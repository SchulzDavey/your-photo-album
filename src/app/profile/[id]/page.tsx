import prisma from '@/prisma/client';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '../../api/auth/[...nextauth]/authOptions';
import FollowButton from './FollowButton';
import Image from 'next/image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const userSession = await prisma.user.findUnique({
    where: {
      id: (session?.user as User)?.id,
    },
  });
  const followingProfiles = await prisma.user.findMany({
    where: {
      id: {
        in: userSession?.followingIds,
      },
    },
  });
  const userProfile = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (userProfile?.id !== userSession?.id) {
    return (
      <section className="py-8 flex flex-col gap-8">
        <div className="flex flex-col gap-3 items-center">
          <FollowButton userSession={userSession!} userProfile={userProfile!} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-3 items-center">
        <h1>{userSession?.name}</h1>
        <ul>
          {followingProfiles.map((profile) => (
            <li key={profile.id}>
              <p>{profile.name}</p>
              <Avatar>
                <AvatarImage className="object-cover" src={profile?.image!} />
                <AvatarFallback>
                  {profile?.name?.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProfilePage;
