'use client';

import { User } from '@prisma/client';
import CreateAlbumDialog from './CreateAlbumDialog';
import { UserProps } from './Header';
import PersonalInfoDialog from './PersonalInfoDialog';

const ActionContainer = ({ user }: { user: User | UserProps }) => {
  return (
    <>
      <CreateAlbumDialog />
      <PersonalInfoDialog user={user} />
    </>
  );
};

export default ActionContainer;
