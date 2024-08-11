"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = ({ user }: { user: User }) => {
  const pathname = usePathname();

  return (
    <nav className="w-full h-[60px] border-b p-2 flex items-center justify-between">
      <Link href="/" className="ml-2 text-3xl font-semibold">
        Flashcards
      </Link>
      <div className="flex items-center gap-x-2 mr-2">
        {user.isAdmin && (
          <>
            {pathname === "/" ? (
              <Link
                href="/admin"
                className={cn(
                  buttonVariants({
                    size: "sm",
                  })
                )}
              >
                Admin
              </Link>
            ) : (
              <Link
                href="/"
                className={cn(
                  buttonVariants({
                    size: "sm",
                  })
                )}
              >
                Home
              </Link>
            )}
          </>
        )}
        <Button
          onClick={async () => {
            await signOut({ callbackUrl: "/sign-in" });
          }}
          variant="secondary"
          size="sm"
        >
          <LogOut className="size-5 mr-1" />
          Log Out
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
