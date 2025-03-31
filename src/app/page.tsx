import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getCurrentUser({ withFullUser: true });
  if (user) return redirect("/blocks");
  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to React Recipes v2</h1>
      <h2 className="text-xl font-bold mb-6 text-center">Delicious snippets are just a click away...</h2>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
