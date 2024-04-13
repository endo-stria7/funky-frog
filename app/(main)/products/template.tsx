import { Button } from '@/components/ui/button';
import ProductsAside from './aside';

function _CTAButton() {
  return <Button className="mt-4">Add Product</Button>;
}

function _EmptyContent({
  heading = 'Inventory',
  title = 'You have no products',
  description = 'You can start selling as soon as you add a product.',
  CTAButton = _CTAButton,
}: {
  heading?: string;
  title?: string;
  description?: string;
  CTAButton?: React.ElementType;
}) {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{heading}</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <CTAButton />
        </div>
      </div>
    </>
  );
}
export default function ProductTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <ProductsAside />
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#">Products</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header> */}
          {children}
        </main>
      </div>
    </div>
  );
}
