import { Avatar, AvatarImage, AvatarFallback } from '@/theme/ui/avatar';
import React from 'react';

type AvatarProp = {
  userName: string;
  avatarUrl: string;
} & React.HTMLAttributes<HTMLSpanElement>;

//FIXME remember username can be preset by backends (starting with user_)
const takeStringShortcut = (input: string) => {
  if (input.includes(' ')) {
    const _input = input.split(' ');
    return (_input[0][0] + _input[1][0]).toUpperCase();
  }
  return (input[0] + input[1]).toUpperCase();
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
