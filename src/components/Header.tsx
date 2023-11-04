'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo.png';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setActiveLink } from '@/redux/features/link-slice';

export type UserProps =
  | {
      name?: string | undefined | null;
      email?: string | undefined | null;
      image?: string | undefined | null;
    }
  | undefined;

const Header = ({ user }: { user: UserProps | User }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/">
          <Image
            src={logo}
            className="h-auto"
            width="60"
            height="60"
            alt="logo"
          />
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.image!} />
                <AvatarFallback>
                  {user?.name?.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {`${user?.name?.charAt(0).toUpperCase()}${user?.name?.slice(
                  1
                )}`}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => dispatch(setActiveLink('personal-info'))}
              >
                Bekijk informatie
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
