import { getUserInfo } from "@/actions/auth";
import { redirect } from "next/navigation";
import CreateNewDialog from "./create-new-dialog";
import { getAllFlashcards } from "@/actions/flashcard";
import AdminFlashcards from "./admin-flashcards";

const AdminPage = async () => {
  const user = await getUserInfo();
  if (!user) {
    return redirect("/sign-in");
  }

  if (!user.isAdmin) {
    return redirect("/");
  }

  const flashcards = await getAllFlashcards();

  return (
    <main className="mt-6 max-w-[1000px] mx-auto flex flex-col px-4">
      <div className="flex flex-col gap-y-2 sm:flex-row items-center justify-between">
        <h3 className="text-4xl text-center">All Your Flashcards</h3>
        <CreateNewDialog />
      </div>
      <div className="mt-10 flex flex-col w-full items-center">
        {flashcards.length === 0 ? (
          <div className="text-2xl text-stone-300">No Flashcards found!</div>
        ) : (
          <div className="w-full flex flex-col">
            {flashcards.map((flashcard) => (
              <AdminFlashcards key={flashcard.id} flashcard={flashcard} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPage;
