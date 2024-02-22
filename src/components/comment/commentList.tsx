import React, { Fragment } from 'react';
import BaseAvatar from '../base/baseAvatar';
import Title from '@/theme/typography/title';
import { CardDescription } from '@/theme/ui/card';
import Words from '@/theme/typography/words';
import { SiteComment } from '@/models/comment';
import { fetchComments } from '@/fetchers/comments';
import { Separator } from '@/theme/ui/separator';

const CommentLi = ({
  userName,
  userProfileUrl,
  userRate,
  publishedAt,
  commentTitle,
  commentContent,
}: SiteComment) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex justify-center items-center w-[10%] h-full">
        <BaseAvatar userName={userName} avatarUrl={userProfileUrl}></BaseAvatar>
      </div>

      <div className="w-[90%]">
        <Title>{commentTitle}</Title>
        <CardDescription> rate: {userRate}/5</CardDescription>
        <p className="text-pretty hyphens-auto " lang="en">
          {commentContent}
        </p>
        <Words>{publishedAt}</Words>
      </div>
    </div>
  );
};

const CommentList = async () => {
  const data = await fetchComments();
  return (
    <div className="w-full">
      {data.map(
        (
          {
            userProfileUrl,
            userName,
            userRate,
            publishedAt,
            commentContent,
            commentTitle,
          },
          idx
        ) => {
          return (
            <Fragment key={userProfileUrl}>
              <CommentLi
                userProfileUrl={userProfileUrl}
                userName={userName}
                userRate={userRate}
                publishedAt={publishedAt}
                commentContent={commentContent}
                commentTitle={commentTitle}
              />
              {idx !== data.length - 1 ? <Separator></Separator> : null}
            </Fragment>
          );
        }
      )}
    </div>
  );
};

export default CommentList;
