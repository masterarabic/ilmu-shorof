import { signIn } from "next-auth/react";
import React from "react";

import { Button } from "@/common/components/ui/button";

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Button
        type="button"
        onClick={() => {
          signIn();
        }}
      >
        Login Google
      </Button>
    </div>
  );
};

export default LoginPage;
