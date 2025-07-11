import React from "react";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { Typography } from "@/components/Typography";
import { LogoNavLink } from "@/components/LogoNavLink";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title = "Welcome to Mimiru", description }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-indigo-950 to-blue-950 relative overflow-hidden">
      {/* Decorative blurred gradient shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-700 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-indigo-700 via-blue-700 to-purple-700 opacity-20 rounded-full blur-2xl z-0" />
      <AnimatedContainer duration={0.5}>
        <div className="relative w-full max-w-lg min-w-[340px] p-10 bg-zinc-900/70 border border-zinc-700 rounded-3xl shadow-2xl text-zinc-100 backdrop-blur-xl overflow-hidden z-10 before:absolute before:inset-0 before:rounded-3xl before:pointer-events-none before:border-2 before:border-blue-600/30 before:blur before:opacity-60">
          {/* Logo and heading */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <LogoNavLink />
            <Typography variant="h3" weight="extrabold" className="text-white text-center drop-shadow-lg">
              {title}
            </Typography>
            {description && (
              <Typography variant="body" className="text-zinc-400 text-center max-w-md">
                {description}
              </Typography>
            )}
          </div>
          {children}
        </div>
      </AnimatedContainer>
    </div>
  );
};

export  {AuthLayout};
