"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import from 'next/navigation' for routing in the app directory
import { useEffect } from "react";
import { Button } from "@nextui-org/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="loading"></div>; // Optional: Add a loading state
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <img src="/logo.png" alt="Logo" className="mx-auto w-80 mb-10" />
        <Button color="secondary" onPress={() => signIn("google")}>
          Login with Google
        </Button>
      </div>
    </div>
  );
}
