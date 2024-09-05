"use client";

import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { SIGN_UP_FORM } from "@/constants/authForm";
import { useAuthSignUp } from "@/hooks/auth";
import dynamic from "next/dynamic";
import { FormGenerator } from "../FormGenerator";

const OtpInput = dynamic(
  () =>
    import("@/components/common/OtpInput").then(
      (component) => component.default
    ),
  { ssr: false }
);

export default function SignUpForm() {
  const {
    code,
    creating,
    errors,
    getValues,
    onGenerateCode,
    onInitiateUserRegistration,
    register,
    setCode,
    verifying,
  } = useAuthSignUp();

  return (
    <form
      onSubmit={onInitiateUserRegistration}
      className="flex flex-col gap-3 mt-10"
    >
      {verifying ? (
        <div className="flex justify-center mb-5">
          <OtpInput otp={code} setOtp={setCode} />
        </div>
      ) : (
        SIGN_UP_FORM.map((field) => (
          <FormGenerator
            {...field}
            key={field.id}
            register={register}
            errors={errors}
          />
        ))
      )}

      {verifying ? (
        <Button type="submit" className="rounded-2xl">
          {creating && <Icons.spinner className="animate-spin h-5 w-5 mr-2" />}
          Sign Up with Email
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() =>
            onGenerateCode(getValues("email"), getValues("password"))
          }
        >
          {creating && <Icons.spinner className="animate-spin h-5 w-5 mr-2" />}
          Generate Code
        </Button>
      )}
    </form>
  );
}
