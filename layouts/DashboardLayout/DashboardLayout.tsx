import React from 'react';
import { ROUTES } from '@/constants/routes';
import { LogoNavLink } from '@/components/LogoNavLink';
import { NavigationLink } from '@/components/NavigationLink';
// import { UserProfile } from '@/components/UserProfile'; // Uncomment if you have a user profile component

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    { label: 'Titles', href: ROUTES.DASHBOARD_TITLES },
    { label: 'Genres', href: ROUTES.DASHBOARD_GENRES },
    { label: 'Title Versions', href: ROUTES.DASHBOARD_TITLE_VERSIONS },
    { label: 'Chapters', href: ROUTES.DASHBOARD_CHAPTERS },
    { label: 'Pages', href: ROUTES.DASHBOARD_PAGES },
    { label: 'Users', href: ROUTES.DASHBOARD_USERS },
  ];

  return (
    <div className="w-full h-screen bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="w-full h-20 flex items-center justify-between px-8 border-b border-zinc-900 bg-zinc-950 flex-shrink-0">
        <div className="flex items-center gap-6">
          <LogoNavLink />
          <span className="text-xl font-bold text-zinc-100">Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded bg-zinc-900 text-zinc-100 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ width: 240 }}
          />
          {/* <UserProfile /> */}
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">U</div>
        </div>
      </header>
      {/* Main layout */}
      <div className="flex flex-1 h-0">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col gap-2 py-8 px-4 flex-shrink-0">
          {navItems.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded text-zinc-300 hover:bg-blue-500 hover:text-white transition-colors font-medium text-start"
            >
              {item.label}
            </NavigationLink>
          ))}
        </aside>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto h-full">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
