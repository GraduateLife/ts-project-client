import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/theme/ui/form';
import { Input, InputProps } from '@/theme/ui/input';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  forwardRef,
} from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

export type FormInputProp = {
  upperController: UseFormReturn<any, any, any>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  inputName: string;
  inputLabel: string;
  inputType: HTMLInputTypeAttribute;
  inputPlaceholder: string;
  inputDescription: string;
  test_value?: string;
};

export type IFormInput = (data: FormInputProp) => JSX.Element;

const BaseFormInput: IFormInput = ({
  upperController,
  onChange = undefined,
  className = '',
  inputName,
  inputLabel,
  inputType,
  inputPlaceholder,
  inputDescription,
  test_value,
}: FormInputProp) => {
  const handleOnChange = (
    field: ControllerRenderProps<any, string>,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    onChange?.(e);
    field.onChange(e);
  };
  return (
    <FormField
      control={upperController.control}
      name={inputName}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{inputLabel}</FormLabel>
          <FormControl>
            <Input
              type={inputType}
              placeholder={inputPlaceholder}
              {...field}
              onChange={handleOnChange.bind(this, field)}
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
