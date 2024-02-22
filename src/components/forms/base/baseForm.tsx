import { Form } from '@/theme/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Fragment, ReactNode, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import BaseFormInput from './baseFormInput';
import { Button } from '@/theme/ui/button';
import { Loader2 } from 'lucide-react';

type BaseFormProps = {
  formSchema: z.ZodType<any, any, any>;
  defaultValues: Record<string, string>;
  labels?: Record<string, string>;
  placeholders?: Record<string, string>;
  types?: Record<string, string>;
  descriptions: Record<string, string>;
  submitHandler: SubmitHandler<any>;
  isSubmittingController: boolean;
  test_values?: Record<string, string>;
  children?: ReactNode;
};

export type IFrom = (data: BaseFormProps) => JSX.Element;

const BaseForm: IFrom = ({
  formSchema,
  defaultValues,
  placeholders = {},
  labels = {},
  types = {},
  children = null,
  descriptions,
  test_values = {},
  isSubmittingController,
  submitHandler,
}) => {
  const shouldBeDefaultValues =
    process.env.NODE_ENV !== 'development'
      ? defaultValues
      : { ...defaultValues, ...test_values };
  const formController = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: shouldBeDefaultValues,
  });
  const fieldNames = useMemo(() => Object.keys(defaultValues), [defaultValues]);

  return (
    <>
      <Form {...formController}>
        <form
          onSubmit={formController.handleSubmit(submitHandler)}
          className="space-y-6"
        >
          {fieldNames.map((item) => {
            return (
              <Fragment key={item}>
                <BaseFormInput
                  upperController={formController}
                  inputLabel={labels[item] ?? item}
                  inputPlaceholder={placeholders[item] ?? ''}
                  inputDescription={descriptions[item] ?? ''}
                  inputName={item}
                  inputType={types[item] ?? 'text'}
                  test_value={test_values[item] ?? undefined}
                ></BaseFormInput>
              </Fragment>
            );
          })}
          {children}
          <div className="flex justify-center items-center my-4">
            <Button
              type="submit"
              className="px-12"
              disabled={isSubmittingController}
            >
              {isSubmittingController && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default BaseForm;
