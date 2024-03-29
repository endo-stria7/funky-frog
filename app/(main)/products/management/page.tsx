'use server';

import Image from 'next/image';
import { File, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react';
import { cache } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductWithSupplierAndCategory } from '@/supabase/queries';
import { type Database } from '@/types/supabase';
import { cn } from '@/lib/utils';

const cachedGetData = cache(getProductWithSupplierAndCategory);
export default async function ProductManagementPage() {
  const data =
    (await cachedGetData()) as unknown as Database['public']['Tables']['products']['Row'][];
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Category
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Supplier
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => {
                    return (
                      <TableRow key={item.product_id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="32"
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRydWNrIj48cGF0aCBkPSJNMTQgMThWNmEyIDIgMCAwIDAtMi0ySDRhMiAyIDAgMCAwLTIgMnYxMWExIDEgMCAwIDAgMSAxaDIiLz48cGF0aCBkPSJNMTUgMThIOSIvPjxwYXRoIGQ9Ik0xOSAxOGgyYTEgMSAwIDAgMCAxLTF2LTMuNjVhMSAxIDAgMCAwLS4yMi0uNjI0bC0zLjQ4LTQuMzVBMSAxIDAgMCAwIDE3LjUyIDhIMTQiLz48Y2lyY2xlIGN4PSIxNyIgY3k9IjE4IiByPSIyIi8+PGNpcmNsZSBjeD0iNyIgY3k9IjE4IiByPSIyIi8+PC9zdmc+"
                            width="32"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.product_name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              item.discontinued
                                ? 'bg-[#82ca9d]'
                                : 'bg-[#ffc658]',
                            )}
                          >
                            {item.discontinued ? 'Archived' : 'Active'}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {item.categories!.category_name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {item.suppliers!.company_name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                          })
                            .format(item.unit_price!)
                            .toString()}
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                          {new Date().toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>{data.length}</strong>{' '}
                products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
