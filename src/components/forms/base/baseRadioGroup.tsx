'use client';

import { Button } from '@/theme/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/theme/ui/form';
import { RadioGroup, RadioGroupItem } from '@/theme/ui/radio-group';
import { toast } from '@/theme/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import { ControllerRenderProps, Form, useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormInputProp, IFormInput } from './baseFormInput';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';

export type RadioChoice = {
  radioName: string;
  value: string;
};
/**
 * @remarks default choice should only be used when not in form context,in form default value is decided by useForm hook
 */
type BaseRadioGroupProp = {
  choices: RadioChoice[];
  defaultValue?: string;
  notify?: (inp: any) => void;
} & Pick<
  FormInputProp,
  'upperController' | 'className' | 'inputName' | 'inputLabel' | 'test_value'
>;

export const BaseRadioGroup = ({
  upperController,
  notify,
  className = '',
  inputName,
  inputLabel,
  choices,
  defaultValue,
  test_value,
}: BaseRadioGroupProp) => {
  const shouldBeDefaultValue = (val: string) => {
    if (process.env.NODE_ENV === 'development' && test_value) return test_value;
    if (defaultValue) return defaultValue;
    return val;
  };

  return (
    <>
      <FormField
        control={upperController.control}
        name={inputName}
        render={({ field }) => (
          <FormItem className={cn('space-y-3', className)}>
            <FormLabel>{inputLabel}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={shouldBeDefaultValue(field.value)}
                className="flex flex-col space-y-1"
              >
                {choices.map(({ radioName, value }) => {
                  return (
                    <Fragment key={value}>
                      <FormItem className="flex items-center space-x-3 space-y-0 ">
                        <FormControl>
                          <RadioGroupItem
                            value={value}
                            onClick={() => {
                              notify?.(value);
                            }}
                          />
                        </FormControl>
                        <span className="hidden"></span>
                        <FormLabel className="font-normal  cursor-pointer">
                          {radioName}
                        </FormLabel>
                      </FormItem>
                    </Fragment>
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
