"use client";

import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { useGoogleAuth } from "@/hooks/auth";

type GoogleAuthButtonProps = {
  method: "signup" | "signin";
};

export const GoogleAuth = ({ method }: GoogleAuthButtonProps) => {
  const { signUpWith, signInWith } = useGoogleAuth();
  return (
    <Button
      {...(method === "signin"
        ? {
            onClick: () => signInWith("oauth_google"),
          }
        : {
            onClick: () => signUpWith("oauth_google"),
          })}
      className="w-full flex gap-3 bg-themeBlack border-themeGray"
      variant="outline"
    >
      <Icons.google className="w-5 h-5" />
      Google
    </Button>
  );
};
