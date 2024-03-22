"use client";

import { createClient } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function LoginPage() {
  const supabase = createClient();
  return (
    <Auth
      supabaseClient={supabase}
      providers={["google"]}
      appearance={{ theme: ThemeSupa }}
      theme="light"
      view="magic_link"
      redirectTo="http://localhost:3000/auth/callback"
    />
  );
}
