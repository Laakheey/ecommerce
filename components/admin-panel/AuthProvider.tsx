"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

const AuthProvider = ({ children }: PropsType) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
