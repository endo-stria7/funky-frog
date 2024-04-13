'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { rdItemsPerPages } from '@/lib/utils';

export default function TablePagination({
  total,
  offsetTo,
  offsetFrom,
}: {
  total: number;
  offsetTo: number;
  offsetFrom: number;
}) {
  const rdItemsPerPagesArray = useRef(rdItemsPerPages(total));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');

  const maxPage = useMemo(() => {
    return Math.ceil(total / limit);
  }, [total, limit]);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (names: string[], values: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const name of names) {
        const value = values[names.indexOf(name)];
        if (value) {
          params.set(name, value);
        }
      }

      return params.toString();
    },
    [searchParams],
  );
  function getArrayPages() {
    switch (page % 3) {
      case 0:
        return [page - 2, page - 1, page];
      case 1:
        return [page, page + 1, page + 2];
      case 2:
        return [page - 1, page, page + 1];
      default:
        return [];
    }
  }
  return (
    <>
      <div className="text-sm text-muted-foreground flex-1">
        Showing{' '}
        <strong>
          {offsetFrom}-{Math.min(offsetTo, total)}
        </strong>{' '}
        of <strong>{total}</strong> products
      </div>
      <div className="flex">
        <span className="w-[200px]">View items per page</span>
        <Select
          defaultValue={page.toString()}
          onValueChange={(value: string) => {
            router.push(
              `${pathname}?${createQueryString(['limit', 'page'], [value, '1'])}`,
            );
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Items per page</SelectLabel>
              {rdItemsPerPagesArray.current.map((i: number) => (
                <SelectItem key={i} value={i.toString()}>
                  {i}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Pagination className="justify-end">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`${pathname}?${createQueryString(
                    ['page'],
                    [Math.max(page - 1, 1).toString()],
                  )}`}
                />
              </PaginationItem>
            )}
            {(page % 4 === 0 && page < maxPage // if [4,8,12].includes(page) then rerender Array  [1,2,0]~~3 [1,2,3,0]~~4
              ? Array.from({ length: 3 }, (_e, i) => page + i)
              : getArrayPages()
            ).map(
              (p) =>
                p <= maxPage && (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href={`${pathname}?${createQueryString(['page'], [p.toString()])}`}
                      isActive={p === page}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ),
            )}
            {page <= maxPage - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {page < maxPage && (
              <PaginationItem>
                <PaginationNext
                  href={`${pathname}?${createQueryString(
                    ['page'],
                    [Math.min(page + 1, maxPage).toString()],
                  )}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
