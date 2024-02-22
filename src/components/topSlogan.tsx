'use client';
import { X } from 'lucide-react';
import React, { useState } from 'react';

const TopSlogan = () => {
  const [show, setShow] = useState(true);
  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } flex bg-orange-700 justify-between px-4 py-1`}
    >
      <div className=" text-center text-white font-bold mx-auto">
        Free shipping is available!
      </div>
      <X onClick={() => setShow(false)} className="text-white cursor-pointer" />
    </div>
  );
};

export default TopSlogan;
