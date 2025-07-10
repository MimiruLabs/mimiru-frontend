import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-full max-w-lg min-w-[340px] p-10 bg-zinc-900/80 border border-zinc-800 rounded-3xl shadow-2xl text-zinc-100 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
};

export  {AuthLayout};
