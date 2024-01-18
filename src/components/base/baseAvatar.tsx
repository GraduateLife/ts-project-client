import { Avatar, AvatarImage, AvatarFallback } from '@/theme/ui/avatar';
import React from 'react';

type AvatarProp = {
  userName: string;
  avatarUrl: string;
} & React.HTMLAttributes<HTMLSpanElement>;

//FIXME remember username can be preset by backends (starting with user_)
const takeStringShortcut = (input: string) => {
  let prepared: string | string[] = input;
  if (input.includes(' ')) {
    prepared = input.split(' ');
    return (prepared[0][0] + prepared[1][0]).toUpperCase();
  }
  return (prepared[0] + prepared[1]).toUpperCase();
};

const BaseAvatar = ({ userName, avatarUrl, ...rest }: AvatarProp) => {
  return (
    <Avatar {...rest}>
      <AvatarImage src={avatarUrl} alt={userName} />
      <AvatarFallback>{takeStringShortcut(userName)}</AvatarFallback>
    </Avatar>
  );
};

export default BaseAvatar;
