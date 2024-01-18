import SignUpForm from '@/components/forms/signUpForm';
import { Card, CardContent, CardTitle } from '@/theme/ui/card';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex justify-center mt-2">
      <Card className="w-[800px] p-4 ">
        <CardTitle>Create Account</CardTitle>
        <CardContent className="px-[40px] mt-10">
          <SignUpForm></SignUpForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
