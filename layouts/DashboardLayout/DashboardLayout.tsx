"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { LogoNavLink } from '@/components/LogoNavLink';
import { NavigationLink } from '@/components/NavigationLink';
// import { UserProfile } from '@/components/UserProfile'; // Uncomment if you have a user profile component

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
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
            className="px-4 py-2 rounded-full bg-zinc-900 text-zinc-100 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ width: 240 }}
          />
          {/* <UserProfile /> */}
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">U</div>
        </div>
      </header>
      {/* Main layout */}
      <div className="flex flex-1 h-0">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-zinc-900 to-zinc-950 border-r border-zinc-700/50 flex flex-col py-6 px-3 flex-shrink-0 shadow-xl">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  className={`group relative px-4 py-3 rounded-lg font-medium text-start flex items-center gap-3 border transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/30 text-blue-100 border-blue-500/50 shadow-lg shadow-blue-500/20'
                      : 'text-zinc-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-600/20 hover:text-blue-200 hover:border-blue-500/30 border-transparent hover:shadow-md hover:shadow-blue-500/10'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    isActive ? 'bg-blue-400' : 'bg-zinc-600 group-hover:bg-blue-400'
                  }`}></div>
                  {item.label}
                  <div className={`absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-r-full transition-opacity duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>
                </NavigationLink>
              );
            })}
          </div>
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
