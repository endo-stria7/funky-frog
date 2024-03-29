import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import MainNav from '@/components/main-nav';
import AuthButton from '@/components/auth-button';
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
      <MainNav>
        <AuthButton />
      </MainNav>
      <main>{children}</main>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  );
}
