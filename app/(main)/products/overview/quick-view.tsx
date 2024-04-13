'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import {
  Copy,
  SquareArrowOutUpRight,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { type Key, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function OverviewProductsQuickView(
  props: ArrayLike<
    ArrayLike<{
      product_id: Key | null | undefined;
      product_name: string;
      quantity_per_unit: string;
      profit_margin: number;
    }>
  >,
) {
  const arrayProps = Object.values(props);
  const [viewPage, setViewPage] = useState(0);

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Quickview Top 10 Profit Margin
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Product ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Date: November 23, 2023</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              View Detail
            </span>
            <SquareArrowOutUpRight className="h-3.5 w-3.5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="flex font-semibold justify-between">
            <span>Product Details</span>
            <span>Margins</span>
          </div>
          <ol className="grid gap-3 list-decimal">
            {Array.from(arrayProps[viewPage]!).map(
              (item: {
                product_id: Key | null | undefined;
                product_name: string;
                quantity_per_unit: string;
                profit_margin: number;
              }) => {
                return (
                  <li
                    className="flex items-center justify-between"
                    key={item.product_id}
                  >
                    <span className="text-muted-foreground">
                      {`${item.product_name} x `}
                      <span>{item.quantity_per_unit}</span>
                    </span>
                    <span>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }).format(item.profit_margin)}
                    </span>
                  </li>
                );
              },
            )}
          </ol>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6"
                disabled={viewPage === 0}
                onClick={() => {
                  setViewPage(Math.max(viewPage - 1, 0));
                }}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Product</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6"
                disabled={viewPage === arrayProps.length - 1}
                onClick={() => {
                  setViewPage(Math.min(viewPage + 1, arrayProps.length - 1));
                }}
              >
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Product</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
