'use client';
import { useReactive } from '@/hooks/useReactive';
import { Button } from '@/theme/ui/button';
import { Input } from '@/theme/ui/input';

import React, { useRef, useState } from 'react';
import BaseImage from '../../base/baseImage';
import { Label } from '@/theme/ui/label';
import { FormDescription } from '@/theme/ui/form';

export type Uploadable = {
  title: string;
  mimetype: string;
  sizeByte: number; //unit byte
  code: string;
  fullCode: string;
};

type BaseFileUploaderProp = {
  submitHandler: (u: Uploadable) => void;
};

const BaseFileUploader = ({ submitHandler }: BaseFileUploaderProp) => {
  const [base64Codes, setBase64Codes] = useReactive<Uploadable[]>([]);
  const uploaderRef = useRef<HTMLInputElement>(null);

  const readFile = (file: Blob) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        const image = new Image();
        image.title = file.name;
        image.src = reader.result as string;
        setBase64Codes((_old) => {
          const code = image.src.split(',')[1];

          _old[0] = {
            title: file.name,
            mimetype: file.type,
            sizeByte: file.size,
            code,
            fullCode: 'data:' + file.type + ';base64,' + code,
          };
        });
      },
      false
    );
    reader.readAsDataURL(file);
  };

  function previewFiles() {
    // const uploader = document.querySelector('#uploader');
    const files = uploaderRef?.current?.files;
    // const preview = document.querySelector('#preview');

    if (files && files.length > 0) {
      Array.prototype.forEach.call(files, readFile);
    }
  }
  const handleUpload = () => {
    base64Codes[0] ? submitHandler(base64Codes[0]) : null;
  };
  const handleCancel = () => {
    setBase64Codes([]);
  };

  return (
    <>
      <div>
        <Label htmlFor="picture" className="w-full h-full ">
          Choose your avatar
        </Label>
        <div className="flex items-center justify-start space-x-2 mt-2">
          <Input
            id="picture"
            type="file"
            ref={uploaderRef}
            onChange={previewFiles}
          ></Input>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!base64Codes[0]}
          >
            Use it
          </Button>
          <Button type="button" onClick={handleCancel}>
            Do it later
          </Button>
        </div>
        <FormDescription>
          {'click "Use it" after you selected your avatar'}
        </FormDescription>
      </div>

      <div className="h-[200px] mt-3 border-dashed border flex justify-center items-center bg-slate-100 rounded-sm">
        {base64Codes.length > 0
          ? base64Codes.map((item) => {
              return (
                <div
                  className="absolute h-[150px] w-[150px] border-dashed"
                  key={item.title}
                >
                  <BaseImage
                    src={item.fullCode}
                    className="rounded-full"
                    alt={item.title}
                    width={150}
                    height={150}
                  ></BaseImage>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default BaseFileUploader;
