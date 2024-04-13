import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login, loginwithGoogle } from './actions';
import { SubmitButton } from './submit-button';

export default async function LoginPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    console.log(user);
    return redirect('/');
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-8">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="email">Email</Label>
                  <Label className="ml-auto inline-block text-sm">
                    Copy this:{' '}
                    <span className="underline">meraqugar@techz24h.com</span>
                  </Label>
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="meraqugar@techz24h.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Label className="ml-auto inline-block text-sm">
                    Copy this: <span className="underline">Pa$$w0rd!</span>
                  </Label>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <SubmitButton
                formAction={login}
                className={buttonVariants({
                  variant: 'default',
                  className: 'w-full',
                })}
                pendingText="..."
              >
                Login
              </SubmitButton>
              <SubmitButton
                formAction={loginwithGoogle}
                className={buttonVariants({
                  variant: 'outline',
                  className: 'w-full',
                })}
                pendingText="..."
              >
                Login with Google
              </SubmitButton>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
