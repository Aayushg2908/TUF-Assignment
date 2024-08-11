import { auth } from "@/auth";
import Navbar from "./navbar";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/actions/auth";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/sign-in");
  }

  const user = await getUserInfo();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full h-full">
      <Navbar user={user} />
      {children}
    </div>
  );
};

export default MainLayout;
