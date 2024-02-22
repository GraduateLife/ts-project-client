import Title from '@/theme/typography/title';
import Logo from '@/theme/ui/logo';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[100px] h-[70vh] w-full">
      <Logo className="animate-bounce " iconSize={'20vw'}></Logo>
      <Title>Loading...</Title>
    </div>
  );
};

export default Loading;
