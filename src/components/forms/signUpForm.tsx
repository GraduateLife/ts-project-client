'use client';
import BaseForm from '@/components/base/baseForm';
import React, { useState } from 'react';
import * as z from 'zod';
import BaseFileUploader, { Uploadable } from '../base/baseFileUploader';
import { useReactive } from '@/hooks/useReactive';
import { set } from 'lodash';
import { busy } from '@/mock/constants';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';
import { useUserActivity } from '@/hooks/store/namespaces/userActivity';

//^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$

const formSchema = z
  .object({
    Email: z.string().email(),
    AccountId: z
      .string()
      .min(6, {
        message: 'account id must be at least 6 characters.',
      })
      .optional()
      .or(z.literal('')),
    Password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm,
        {
          message:
            'not valid password, your password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 character in #?!@$%^&*-',
        }
      ),
    ConfirmPassword: z.string(),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords don't match",
    path: ['ConfirmPassword'], // path of error
  });

const defaultValues: z.infer<typeof formSchema> = {
  Email: '',
  AccountId: '',
  Password: '',
  ConfirmPassword: '',
};

const test_values: z.infer<typeof formSchema> = {
  Email: 'test@example.com',
  AccountId: '123456',
  Password: '1234Password!',
  ConfirmPassword: '1234Password!',
};

const placeholders: z.infer<typeof formSchema> = {
  Email: 'dappes@example.com',
  AccountId: '',
  Password: '1234Password!',
  ConfirmPassword: '',
};

const descriptions: z.infer<typeof formSchema> = {
  Email: 'enter your email address',
  AccountId: '[Optional] enter your account ID as the second way to login',
  Password: 'enter your password',
  ConfirmPassword: 'enter your password again',
};

const SignUpForm = () => {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const UserActivityNS = useStore(useUserActivity);

  const handleSubmit = async (vs: any) => {
    setIsPending(true);
    await busy(2000);
    setData((_old) => {
      return { ..._old, ...vs };
    });

    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ...data, ...vs }),
    });
    setIsPending(false);

    if (!res.ok) {
      alert('not ok');
      return;
    }
    const got = await res.json();
    UserActivityNS.setLogin();
    UserActivityNS.setAvatar(got.AvatarCode);
    UserActivityNS.setAccountId(got.AccountId);
    router.push('/');

    // console.log('got', got);
  };
  const handleAvatar = (up: Uploadable) => {
    // console.log(up);
    setData((_old) => {
      return { ..._old, Avatar: { ...up } };
    });
  };

  return (
    <>
      <BaseForm
        formSchema={formSchema}
        defaultValues={defaultValues}
        labels={{
          AccountId: 'Account ID',
          ConfirmPassword: 'Confirm your password',
        }}
        test_values={test_values}
        placeholders={placeholders}
        types={{
          Password: 'password',
          ConfirmPassword: 'password',
        }}
        descriptions={descriptions}
        submitHandler={(vs) => handleSubmit(vs)}
        isSubmittingController={isPending}
      >
        <BaseFileUploader submitHandler={handleAvatar}></BaseFileUploader>
      </BaseForm>
    </>
  );
};

export default SignUpForm;
