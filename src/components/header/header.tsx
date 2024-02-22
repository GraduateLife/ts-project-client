'use client';

import React, {
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Logo from '@/theme/ui/logo';
import { Input } from '@/theme/ui/input';
import { Button } from '@/theme/ui/button';

import * as constants from '../../theme/constants';
import { useDebounce } from '@/hooks/useDebounce';
import { usePathname, useRouter } from 'next/navigation';
import BaseAvatar from '../base/baseAvatar';

import ShoppingCartDrawer from '../shoppingCart/shoppingCartDrawer';
import { useUserActivity } from '@/hooks/store/namespaces/userActivity';
import { useStore } from 'zustand';

import Link from 'next/link';
import UserAvatarCard from './userAvatar';
import SkipSSR from '@/theme/ui/SkipSSR';
import { ModeToggle } from '@/theme/themeProvider';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const UserActivityNS = useStore(useUserActivity);
  const [content, setContent] = useState(
    UserActivityNS.recorded.selectedProductFilter.KeyWord ?? ''
  );
  // alert(UserActivityNS.recorded.selectedProductFilter.KeyWord);
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    if (inputRef?.current && pathname === '/products') {
      inputRef.current.value = content;
    }
  });

  const handleBackHome = () => {
    router.push('/');
  };

  const handleInput = useDebounce((e) => {
    setContent(e.target.value);
    const _old = UserActivityNS.recorded.selectedProductFilter;
    UserActivityNS.updateProductFilter({ ..._old, KeyWord: e.target.value });
  }, 300);

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (pathname === '/products') {
      location.reload();
    } else {
      router.push('/products');
    }
  };

  return (
    <div className="relative px-[10%] py-[5px] w-full h-[60px] border-b bg-white dark:bg-slate-700">
      <header className="flex justify-between items-center space-x-2 sticky top-0 z-10 ">
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

        {/* search bar */}
        <div className="flex flex-row  w-[20rem] sm:w-[40rem] space-x-1">
          {/* enable to use enter key to search*/}
          <form
            onSubmit={handleSearch}
            className="inline-flex space-x-1 w-full"
          >
            <Input
              ref={inputRef}
              placeholder="What do you want today?"
              type="text"
              className="outline-0 "
              onChange={handleInput}
            />
            <Button type="submit">Go!</Button>
          </form>
        </div>

        <div className="w-[120px]">
          <SkipSSR>
            {UserActivityNS.recorded.isLoggedIn ? (
              <div className="inline-flex space-x-3">
                <UserAvatarCard></UserAvatarCard>
                <ShoppingCartDrawer></ShoppingCartDrawer>
              </div>
            ) : (
              <Button variant={'link'} asChild>
                <Link href="/login">Login/Sign up</Link>
              </Button>
            )}
          </SkipSSR>
        </div>
      </header>
      <div className="absolute right-4 top-0 py-[10px] z-10 ">
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
};

export default Header;
