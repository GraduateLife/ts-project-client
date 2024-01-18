import { Button } from '@/theme/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/theme/ui/hover-card';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import BaseAvatar from './base/baseAvatar';
import { ipsumUrl } from '@/mock/constants';

type BusinessCardProps = {
  name: string;
  avatarUrl?: string;
  publishedAt: string | Date;
} & HTMLAttributes<HTMLDivElement>;

const BrandCard = ({
  name,
  avatarUrl,
  publishedAt,
  ...attrs
}: BusinessCardProps) => {
  return (
    <div {...attrs}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="text-lg">
            {name}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-30">
          <div className="flex justify-between space-x-4">
            <BaseAvatar
              userName={'vrebetbe'}
              avatarUrl={ipsumUrl(25)}
            ></BaseAvatar>
            <div className="space-y-1">
              <h4 className="text-md font-semibold">Brand: {name}</h4>
              <div className="flex items-center pt-2">
                <span className="text-xs text-muted-foreground">
                  published at{' '}
                  {publishedAt instanceof Date
                    ? publishedAt.toLocaleDateString()
                    : publishedAt}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default BrandCard;
