import { ROUTES, ROUTE_NAMES } from "@/constants";
import { Typography } from "@/components/Typography";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { NavigationLink } from "@/components/NavigationLink";
import { cn } from "@/utils/cn";
import { useMemo } from "react";

const containerClasses = cn(
  "flex items-center justify-between",
  "absolute z-50 top-0 left-0 right-0",
  "rounded-b-2xl px-2 py-4 sm:px-4",
  "w-full container mx-auto"
);

const navClasses = cn(
  "flex items-center justify-center gap-4",
  "px-2 py-2.5 rounded-full",
  "bg-zinc-900 border border-zinc-700",
  "shadow-lg shadow-zinc-800",
);

const linkClasses = "px-4 rounded-full";

type NavLink = { href: string; label: string };

const Navigation: React.FC = () => {
  const NAV_LINKS: NavLink[] = useMemo(() => [
    { href: ROUTES.HOME, label: ROUTE_NAMES.HOME },
    { href: ROUTES.TITLES, label: ROUTE_NAMES.TITLES },
    { href: ROUTES.ABOUT, label: ROUTE_NAMES.ABOUT },
  ], []);

  return (
    <nav className={navClasses}>
      {NAV_LINKS.map(({ href, label }) => (
        <NavigationLink key={href} href={href} className={linkClasses}>
          <Typography variant="body-sm" weight="medium">
            {label}
          </Typography>
        </NavigationLink>
      ))}
    </nav>
  );
};

const LoginButton: React.FC = () => (
  <NavigationLink href={ROUTES.HOME} className={linkClasses}>
    <Typography variant="body-sm" weight="semibold">Login</Typography>
  </NavigationLink>
);

const MainLayoutHeader: React.FC = () => (
  <div className={containerClasses}>
    <AnimatedContainer delay={0.1} className="flex items-center">
      <NavigationLink href={ROUTES.HOME}>
        <Typography variant="h4" weight="bold">Mimiru</Typography>
      </NavigationLink>
    </AnimatedContainer>
    <AnimatedContainer delay={0.2} className="w-full max-w-lg mx-auto">
      <Navigation />
    </AnimatedContainer>
    <AnimatedContainer delay={0.3} className="flex items-center">
      <LoginButton />
    </AnimatedContainer>
  </div>
);

export { MainLayoutHeader };
