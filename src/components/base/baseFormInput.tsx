import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/theme/ui/form';
import { Input } from '@/theme/ui/input';
import React, { HTMLInputTypeAttribute } from 'react';
import { UseFormReturn } from 'react-hook-form';

type FormInputProp = {
  upperController: UseFormReturn<any, any, undefined>;
  inputName: string;
  inputLabel: string;
  inputType: HTMLInputTypeAttribute;
  inputPlaceholder: string;
  inputDescription: string;
  test_value?: string;
};

const BaseFormInput = ({
  upperController,
  inputName,
  inputLabel,
  inputType,
  inputPlaceholder,
  inputDescription,
  test_value,
}: FormInputProp) => {
  return (
    <FormField
      control={upperController.control}
      name={inputName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{inputLabel}</FormLabel>
          <FormControl>
            <Input
              type={inputType}
              placeholder={inputPlaceholder}
              {...field}
              value={
                process.env.NODE_ENV === 'development' && test_value
                  ? test_value
                  : undefined
              }
              className="w-full"
            />
          </FormControl>
          <FormDescription>{inputDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BaseFormInput;
