'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn, futureWeeks, tmr, today } from '@/lib/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/theme/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/theme/ui/popover';
import { Button } from '@/theme/ui/button';
import { Calendar } from '@/theme/ui/calendar';

import React from 'react';
import { FormInputProp } from './baseFormInput';
import { Matcher } from 'react-day-picker';

type BaseDatePickerProp = {
  disableRange: Matcher | Matcher[] | undefined;
} & Omit<FormInputProp, 'inputType' | 'inputPlaceholder'>;

const BaseDatePicker = ({
  upperController,
  inputName,
  inputLabel,
  inputDescription,
  disableRange,
}: BaseDatePickerProp) => {
  return (
    <FormField
      control={upperController.control}
      name={inputName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{inputLabel}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={disableRange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{inputDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BaseDatePicker;
