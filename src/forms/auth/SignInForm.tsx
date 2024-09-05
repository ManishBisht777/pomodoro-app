"use client";

import { Loader } from "@/common/Loader";
import { Button } from "@/components/ui/button";
import { SIGN_IN_FORM } from "@/constants/authForm";
import { useAuthSignIn } from "@/hooks/auth";
import { FormGenerator } from "../FormGenerator";

type Props = {};

const SignInForm = (props: Props) => {
  const { isPending, onAuthenticateUser, register, errors } = useAuthSignIn();

  return (
    <form className="flex flex-col gap-3 mt-10" onSubmit={onAuthenticateUser}>
      {SIGN_IN_FORM.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
        />
      ))}
      <Button type="submit">
        <Loader loading={isPending}>Sign In with Email</Loader>
      </Button>
    </form>
  );
};

export default SignInForm;
