'use client';
import { useCartListStore } from '@/hooks/store/namespaces/cartList';
import { useCurrentProduct } from '@/hooks/store/namespaces/currentProduct';
import { useUserActivity } from '@/hooks/store/namespaces/userActivity';
import { useDebounce } from '@/hooks/useDebounce';
import { useInterval } from '@/hooks/useInterval';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useReactive } from '@/hooks/useReactive';
import { ChosenSpec, SpecChoices } from '@/models/product';
import Spacer from '@/theme/typography/spacer';
import Words from '@/theme/typography/words';
import { Button } from '@/theme/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/theme/ui/toggle-group';
import { fr } from '@faker-js/faker';

import React, { Fragment, MouseEventHandler, useCallback } from 'react';
import { useStore } from 'zustand';

type ProductSpecSelectorProp = {} & SpecChoices;

type ProductSpecSelectorListProp = {
  specs: SpecChoices[];
};

//TODO there is idea to set specChoice by url queryString
const ProductSpecSelector = ({
  specName,
  specChoices,
}: ProductSpecSelectorProp) => {
  const UserActivityNS = useStore(useUserActivity);
  const CurrentProductNS = useStore(useCurrentProduct);
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const _target = e.target as HTMLElement;
    const theValue = _target.innerText;
    if (
      UserActivityNS.recorded.chosenSpecsOfItemIds[
        CurrentProductNS.currentProduct.productId
      ]?.find((item) => item.specName === specName)
    ) {
      UserActivityNS.updateChosenSpecs(
        CurrentProductNS.currentProduct.productId,
        {
          specName,
          specValue: theValue,
        }
      );
    } else {
      UserActivityNS.addChosenSpecs(CurrentProductNS.currentProduct.productId, {
        specName,
        specValue: theValue,
      });
    }
  };

  return (
    <>
      <Words>Choose {specName}</Words>
      <ToggleGroup
        variant="outline"
        type="single"
        className="flex justify-start flex-wrap"
      >
        {specChoices.map((item, idx) => {
          return (
            <Fragment key={idx}>
              <ToggleGroupItem
                className="dark:bg-white dark:text-black"
                value={item.toString()}
                aria-label={`Choose ${item.toString()}`}
                onClick={handleClick}
              >
                {item}
              </ToggleGroupItem>
            </Fragment>
          );
        })}
      </ToggleGroup>
    </>
  );
};

const ProductSpecSelectorList = ({ specs }: ProductSpecSelectorListProp) => {
  return (
    <>
      {specs.map(({ specName, specChoices }, idx) => {
        return (
          <Fragment key={idx}>
            <ProductSpecSelector
              specName={specName}
              specChoices={specChoices}
            ></ProductSpecSelector>
          </Fragment>
        );
      })}
      <Spacer />
    </>
  );
};

export default ProductSpecSelectorList;
