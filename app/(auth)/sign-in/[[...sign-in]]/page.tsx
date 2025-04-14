import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl  text-[#2E2A47]">Welcome Back!</h1>
          <p className="text-base text-[#7E8CA0]">Tracking expenses made easy</p>
        </div>
        <div className="flex item-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foregroud"></Loader2>
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-stone-200 hidden lg:flex items-center justify-center">
        <Image src="/logo.png" height={300} width={300} alt="Logo" />
      </div>
    </div>
  );
}