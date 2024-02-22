import { SiteEvent } from '@/models/event';
import { _fetch } from '.';

export const fetchEvents = async () => {
  const eventData = await _fetch<SiteEvent[]>('/api/events');
  const gotEvents = Object.values(eventData.data);
  return gotEvents;
};
