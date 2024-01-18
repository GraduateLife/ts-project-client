import React from 'react';
import BaseAvatar from './base/baseAvatar';
import { ipsumUrl } from '@/mock/constants';
import Title from '@/theme/typography/title';
import { CardDescription } from '@/theme/ui/card';
import Words from '@/theme/typography/words';

type Comment = {
  userProfileUrl: string;
  userName: string;
  userRate: number;
  publishedAt: string;
  commentContent: string;
};

const CommentLi = ({
  userName,
  userProfileUrl,
  userRate,
  publishedAt,
  commentContent,
}: Comment) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="mx-20">
        <BaseAvatar userName={userName} avatarUrl={userProfileUrl}></BaseAvatar>
      </div>
      <div className="flex-grow">
        <Title>{userName}</Title>
        <CardDescription> rate: {userRate}/5</CardDescription>
        <p className="text-pretty hyphens-auto " lang="en">
          {commentContent}
        </p>
        <Words>{publishedAt}</Words>
      </div>
    </div>
  );
};

const CommentList = () => {
  return (
    <div className="w-full">
      <CommentLi
        userProfileUrl={ipsumUrl(25)}
        userName={'vewvwv'}
        userRate={4}
        publishedAt={new Date().toLocaleString()}
        commentContent={'vtehnrtynyrtmytm '.repeat(20)}
      />
    </div>
  );
};

export default CommentList;
