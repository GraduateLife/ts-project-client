import React from 'react';
import { marked } from 'marked';
type ProductIntroductionProp = {
  mdString: string;
};
//TODO replace this with mdx parser
const ProductIntroduction = ({ mdString }: ProductIntroductionProp) => {
  return (
    <>
      <div
        className="px-20"
        dangerouslySetInnerHTML={{ __html: marked.parse(mdString) as string }}
      ></div>
    </>
  );
};

export default ProductIntroduction;
