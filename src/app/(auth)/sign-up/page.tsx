"use client";

import { Icons } from "@/components/common/Icons";
import { buttonVariants } from "@/components/ui/button";
import { GoogleAuth } from "@/forms/auth/GoogleAuth";
import SignUpForm from "@/forms/auth/SignUpForm";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <>
      <div className="container flex h-full w-full flex-col items-center justify-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8"
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <SignUpForm />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleAuth method="signup" />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/sign-in"
              className="hover:text-brand underline underline-offset-4"
            >
              Already have an account? Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
