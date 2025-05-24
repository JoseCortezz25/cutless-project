import Link from 'next/link';

export const Navbar = () => {
  return (
    <header className="w-full px-6 py-6 shadow-lg/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center text-lg font-bold">
          <span className="text-white">■</span>
          <span className="ml-2">Cutless</span>
        </Link>
      </div>
    </header>
  );
};
