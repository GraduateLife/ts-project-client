'use client';

import React, { useEffect, useState } from 'react';
import Logo from '@/theme/ui/logo';
import { Input } from '@/theme/ui/input';
import { Button } from '@/theme/ui/button';

import * as constants from '../../theme/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import BaseAvatar from '../base/baseAvatar';

import ShoppingCartDrawer from '../shoppingCartDrawer';
import { useUserActivity } from '@/hooks/store/namespaces/userActivity';
import { useStore } from 'zustand';

import Link from 'next/link';
import UserAvatarCard from './userAvatar';

const DEVONLYHELPER = () => {
  useEffect(() => {
    console.log();
    return () => {
      process.env.NODE_ENV === 'development' ? localStorage.clear() : null;
    };
  });
  return <div className="h-0 w-0 hidden"></div>;
};

const Header = () => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const UserActivityNS = useStore(useUserActivity);

  const handleBackHome = () => {
    router.push('/');
  };

  const handleInput = useDebounce((e) => {
    setContent(e.target.value);
  }, 1000);

  const handleSearch: React.FormEventHandler<HTMLButtonElement> = () => {
    console.log('==>', content);
  };

  return (
    <>
      {/* <DEVONLYHELPER></DEVONLYHELPER> */}
      <header
        id="##site-top"
        className="px-[10%] py-[5px] flex justify-between items-center space-x-2 sticky top-0 bg-white z-10 border-b"
      >
        {/* logo display */}
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={handleBackHome}
        >
          <Logo iconSize="2rem" />
          <div className="hidden xl:block leading-[50px] ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            {constants.site_name}
          </div>
        </div>

        {/* TODO  autocomplete*/}
        {/* search bar */}
        <div className="flex flex-row space-x-3 w-[20rem] sm:w-[40rem]">
          <Input
            placeholder="What do you want today?"
            type="text"
            className="outline-0 "
            onChange={handleInput}
          />
          <Button type="button" onClick={handleSearch}>
            Go!
          </Button>
        </div>

        <div className="w-[120px]">
          {typeof window !== 'undefined' &&
          UserActivityNS.recorded.isLoggedIn ? (
            <div className="inline-flex space-x-3">
              <UserAvatarCard></UserAvatarCard>
              <ShoppingCartDrawer></ShoppingCartDrawer>
            </div>
          ) : (
            <Button variant={'link'} asChild>
              <Link href="/login">Login/Sign up</Link>
            </Button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
