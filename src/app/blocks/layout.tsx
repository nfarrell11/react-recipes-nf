import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { LogOutButton } from "@/auth/nextjs/components/LogOutButton";
import { ReactNode } from "react";
import { CancelButton } from "@/blocks/nextjs/components/CancelButton";
import { HomeButton } from "@/blocks/nextjs/components/HomeButton";

/**
 * Protects /blocks and all nested routes.
 * Displays a header with user info and a logout button.
 */
export default async function BlocksLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Fetch the authenticated user
  const user = await getCurrentUser({
    redirectIfNotFound: true, // Redirects to /sign-in if not authenticated
    withFullUser: true,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with user info and logout button */}
      <header className="bg-gray-100 shadow p-4">
        <div className="container mx-auto sm:flex justify-between items-center">
          {/* User Info */}
          <div className="sm:flex items-center gap-4">
            <HomeButton />
            <h1 className="text-xl font-bold text-gray-700 p-4">
              Hello, {user.name}!
            </h1>
          </div>
          <div className="gap-4 md:flex items-center ">
            <CancelButton />
            <LogOutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
