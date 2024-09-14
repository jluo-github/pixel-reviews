"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      {href === pathname ? (
        <Link className='text-gray-900 font-semibold' href={href}>
          {children}
        </Link>
      ) : (
        <Link className='text-gray-900 hover:underline' href={href}>
          {children}
        </Link>
      )}
    </>
  );
};
export default NavLink;
