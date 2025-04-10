import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="font-bold text-4xl font-poppins ">
      <div className="flex gap-2">
        <img className="w-10 h-10 dark:invert" src="/logo.svg" alt="logo" />
        <span>Testatron</span>
      </div>
    </Link>
  );
}
