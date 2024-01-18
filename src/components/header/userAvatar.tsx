import React from 'react';
import BaseAvatar from '../base/baseAvatar';
import { useUserActivity } from '@/hooks/store/namespaces/userActivity';
import { useStore } from 'zustand';
import { Button } from '@/theme/ui/button';

import { CalendarDays } from 'lucide-react';
import {
  HoverCardTrigger,
  HoverCard,
  HoverCardContent,
} from '@/theme/ui/hover-card';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const UserAvatar = () => {
  const UserActivityNS = useStore(useUserActivity);
  const handleNavigation = () => {};
  return (
    <BaseAvatar
      userName={UserActivityNS.recorded.accountId}
      avatarUrl={UserActivityNS.recorded.avatarCode}
      className="cursor-pointer"
    ></BaseAvatar>
  );
};

const UserAvatarCard = () => {
  const UserActivityNS = useStore(useUserActivity);
  return (
    <HoverCard>
      <HoverCardTrigger>
        <UserAvatar></UserAvatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 space-y-4">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">
              {UserActivityNS.recorded.accountId}
            </h4>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">
                Joined us since December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserAvatarCard;
