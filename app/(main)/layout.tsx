import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { TopNavBar } from '@/components/top-nav-bar';
// import { SiteFooter } from '@/components/site-footer';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <TopNavBar />
      {children}
      {/* <SiteFooter className="border-t" /> */}
    </div>
  );
}
