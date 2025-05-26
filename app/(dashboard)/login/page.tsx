// app/(dashboard)/login/page.tsx
import { getProviders } from "next-auth/react";
import LoginForm from "@/app/components/LoginForm";

export default async function LoginPage() {
  const providers = await getProviders();
  
  return (
    <LoginForm providers={providers} />
  );
}