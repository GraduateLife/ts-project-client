import React from 'react';
import BaseAvatar from '../base/baseAvatar';
import { useUserActivity } from '@/hooks/store/namespaces/userActivity';
import { useStore } from 'zustand';
import { Button } from '@/theme/ui/button';

import { CalendarDays, LogOut } from 'lucide-react';
import {
  HoverCardTrigger,
  HoverCard,
  HoverCardContent,
} from '@/theme/ui/hover-card';

const UserAvatarCard = () => {
  const UserActivityNS = useStore(useUserActivity);
  const handleLogOut = () => {
    UserActivityNS.setLogin(false);
  };
  return (
    <HoverCard>
      <HoverCardTrigger>
        <BaseAvatar
          userName={UserActivityNS.recorded.accountId}
          avatarUrl={UserActivityNS.recorded.avatarCode}
          className="cursor-pointer"
        ></BaseAvatar>
      </HoverCardTrigger>
      <HoverCardContent className="flex justify-between w-80">
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
        <LogOut
          className="text-orange-400 cursor-pointer h-full"
          onClick={handleLogOut}
        />
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserAvatarCard;
