'use client';

import { Button } from '@/theme/ui/button';
import { Form } from '@/theme/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BaseFormInput from './base/baseFormInput';
import BaseCheckboxGroup from './base/baseCheckboxGroup';
import { Slider } from '@/theme/ui/slider';

import AsLabel from '@/theme/typography/asLabel';
import { IProductFilter, productFilterFormSchema } from '@/models/product';
import { useStore } from 'zustand';
import { useUserActivity } from '@/hooks/store/namespaces/userActivity';
import SkipSSR from '@/theme/ui/SkipSSR';

/**
 * @remarks this is a pure client side form, will not send request itself
 * @remarks states are recorded in user-activity namespace
 */
const ProductFilterForm = () => {
  const [isPending, setIsPending] = useState(false);
  const UserActivityNS = useStore(useUserActivity);
  const [progressValue, setProgressValue] = useState(
    UserActivityNS.recorded.selectedProductFilter.CommentCount
  );

  const [data, setData] = useState<IProductFilter>({
    CommentCount: progressValue,
  } as IProductFilter);

  const formController = useForm<IProductFilter>({
    resolver: zodResolver(productFilterFormSchema),
    defaultValues: UserActivityNS.recorded.selectedProductFilter,
  });

  const handleProgressBar = (pv: [number]) => {
    const value = pv[0];
    setProgressValue((_old) => value);
    setData((_old) => ({ ..._old, CommentCount: value }));
  };

  const submitHandler = (vs: any) => {
    setIsPending(true);
    UserActivityNS.updateProductFilter({ ...vs, ...data });
    location.reload();
    setIsPending(false);
  };
  return (
    <SkipSSR>
      <Form {...formController}>
        <form
          onSubmit={formController.handleSubmit(submitHandler)}
          className="space-y-6 "
        >
          <AsLabel>By Price</AsLabel>
          <BaseFormInput
            upperController={formController}
            inputName={'MinPrice'}
            inputLabel={'Min Price'}
            inputType={'text'}
            inputPlaceholder={''}
            inputDescription={''}
          ></BaseFormInput>

          <BaseFormInput
            upperController={formController}
            inputName={'MaxPrice'}
            inputLabel={'Max Price'}
            inputType={'text'}
            inputPlaceholder={''}
            inputDescription={''}
          ></BaseFormInput>

          <BaseCheckboxGroup
            upperController={formController}
            inputName={'Rate'}
            inputLabel={'By Product Rate'}
            inputDescription={''}
            choices={[
              { boxName: '1', value: '1' },
              { boxName: '2', value: '2' },
              { boxName: '3', value: '3' },
              { boxName: '4', value: '4' },
              { boxName: '5', value: '5' },
            ]}
          ></BaseCheckboxGroup>

          <div>
            <AsLabel>{`By Comment numbers (${'>' + progressValue})`}</AsLabel>
          </div>
          <Slider
            defaultValue={[progressValue]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleProgressBar}
          ></Slider>

          <div className="flex justify-center items-center my-4">
            <Button type="submit" className="px-12" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </SkipSSR>
  );
};

export default ProductFilterForm;
