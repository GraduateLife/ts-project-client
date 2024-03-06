import { Checkbox } from '@/theme/ui/checkbox';
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from '@/theme/ui/form';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

export type CheckBoxChoice = {
  boxName: string;
  value: string;
};

type BaseCheckboxGroupProp = {
  upperController: UseFormReturn<any, any, any>;
  inputName: string;
  inputLabel: string;
  inputDescription: string;
  choices: CheckBoxChoice[];
};

const BaseCheckboxGroup = ({
  upperController,
  inputName,
  inputLabel,
  inputDescription,
  choices,
}: BaseCheckboxGroupProp) => {
  return (
    <FormField
      control={upperController.control}
      name={inputName}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{inputLabel}</FormLabel>
            <FormDescription>{inputDescription}</FormDescription>
          </div>
          {choices.map((item) => (
            <FormField
              key={item.value}
              control={upperController.control}
              name={inputName}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.value}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {item.boxName}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BaseCheckboxGroup;
