'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FollowButton = ({
  userSession,
  userProfile,
}: {
  userSession: User;
  userProfile: User;
}) => {
  const router = useRouter();
  const [follow, setFollow] = useState(
    userSession.followingIds.includes(userProfile.id)
  );

  const followProfile = async () => {
    await axios
      .post(`/api/follow/${userProfile.id}`)
      .then((response) => {
        router.refresh();
        setFollow(response.data.followed);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Avatar>
        <AvatarImage className="object-cover" src={userProfile?.image!} />
        <AvatarFallback>
          {userProfile?.name?.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <Button
        onClick={() => {
          followProfile();
        }}
      >
        {follow ? 'Unfollow' : 'Follow'}
      </Button>
    </>
  );
};

export default FollowButton;
