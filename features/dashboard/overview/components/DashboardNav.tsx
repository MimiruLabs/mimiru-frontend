import Link from 'next/link';

const navItems = [
  { label: 'Titles', href: '/dashboard/titles' },
  { label: 'Genres', href: '/dashboard/genres' },
  { label: 'Title Versions', href: '/dashboard/title-versions' },
  { label: 'Chapters', href: '/dashboard/chapters' },
  { label: 'Pages', href: '/dashboard/pages' },
  { label: 'Users', href: '/dashboard/users' },
];

export const DashboardNav = () => (
  <nav className="mb-8 flex gap-4 border-b border-zinc-800 pb-4">
    {navItems.map((item) => (
      <Link key={item.href} href={item.href} className="text-zinc-300 hover:text-blue-400 font-medium">
        {item.label}
      </Link>
    ))}
  </nav>
);
