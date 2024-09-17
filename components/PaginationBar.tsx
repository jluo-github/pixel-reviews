import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const PaginationBar = ({ href, page, pageCount }: { href: string; page: number; pageCount: number }) => {
  return (
    <div className='my-1 flex gap-4 items-center'>
      <PaginationLink href={`${href}?page=${page - 1}`} enabled={page > 1}>
        <ChevronLeftIcon className='h-5 w-5' />{" "}
      </PaginationLink>
      <span>
        {" "}
        Page {page} of {pageCount}{" "}
      </span>
      <PaginationLink href={`${href}?page=${page + 1}`} enabled={page < pageCount}>
        {" "}
        <ChevronRightIcon className='h-5 w-5' />{" "}
      </PaginationLink>
    </div>
  );
};
export default PaginationBar;

function PaginationLink({ enabled, href, children }: { enabled: boolean; href: string; children: React.ReactNode }) {
  if (!enabled) {
    return <span className='border cursor-not-allowed rounded text-slate-300 text-sm'>{children}</span>;
  }
  return (
    <Link href={href} className='rounded items-center border bg-violet-400 text-white text-sm hover:bg-violet-600'>
      {children}
    </Link>
  );
}
