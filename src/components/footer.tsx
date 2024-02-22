import Title from '@/theme/typography/title';
import Logo from '@/theme/ui/logo';
import React from 'react';

type ColProp = {
  name: string;
  content: string[];
};

const Col = ({ name, content }: ColProp) => {
  return (
    <div className="flex flex-col justify-center flex-wrap min-w-[200px]">
      <Title>{name}</Title>
      {content.map((c) => {
        return (
          <span className="hover:font-semibold" key={c}>
            {c}
          </span>
        );
      })}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative w-full h-[400px] bg-slate-800 dark:bg-black flex flex-row justify-around items-start text-slate-300 p-6">
      <div className="h-full flex flex-col items-center justify-center">
        <Logo iconSize={'20rem'}></Logo>
      </div>
      <Col
        name="PRODUCTS"
        content={['Teams', 'Advertising', 'Collectives', 'Talent']}
      ></Col>
      <Col
        name="COMPANY"
        content={[
          'About',
          'Press',
          'Work Here',
          'Legal',
          'Privacy Policy',
          'Terms of Service',
          'Contact Us',
          'Cookie Settings',
          'Cookie Policy',
        ]}
      ></Col>
      <Col
        name="STACK EXCHANGE NETWORK"
        content={[
          'Technology',
          'Culture & recreation',
          'Life & arts',
          'Science',
          'Professional',
          'Business',
        ]}
      ></Col>
      <span className="absolute bottom-1 right-6">
        This is a website for demo only
      </span>
    </footer>
  );
};

export default Footer;
