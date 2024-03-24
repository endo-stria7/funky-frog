import { Suspense } from 'react';
import Header from '@/components/Header';
// import { NavBar } from './NavBar';
import { TopNavBar } from '@/components/top-nav-bar';
// import DashboardPage from './dashboard/page';

export default function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Suspense>
        <TopNavBar />
      </Suspense>

      <div className="animate-in fade-in-100 opacity-0 flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">{/*  */}</main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
