'use client';
import { navPath } from '@/constants/navPaths';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationMenu() {
  const currentPath = usePathname();
  return (
    <nav>
      <ul className="flex gap-14 justify-center items-center h-full">
        {navPath.map((item) => (
          <li key={item.name}>
            <Link
              className={cn(
                'text-lg font-poppins hover:underline ease-in-out transition-all hover:text-secondary duration-75 ',
                {
                  'text-secondary': currentPath.startsWith(item.path),
                }
              )}
              href={item.path}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
