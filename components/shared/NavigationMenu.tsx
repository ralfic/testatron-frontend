import { navPath } from '@/constants/navPaths';
import Link from 'next/link';

export default function NavigationMenu() {
  return (
    <nav>
      <ul className="flex gap-14 justify-center items-center h-full">
        {navPath.map((item) => (
          <li key={item.name}>
            <Link
              className="text-lg font-poppins hover:underline ease-in-out transition-all hover:text-secondary duration-75 "
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
