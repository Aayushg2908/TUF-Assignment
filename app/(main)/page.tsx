import { getAllFlashcards } from "@/actions/flashcard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Flashcard from "./flashcard";

const MainPage = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/sign-in");
  }

  const flashcards = await getAllFlashcards();

  return (
    <Carousel className="max-w-[250px] sm:max-w-[400px] md:max-w-[500px] h-[200px] md:h-[300px] mx-auto my-20">
      <CarouselContent className="w-full h-full">
        {flashcards.map((flashcard) => (
          <Flashcard key={flashcard.id} flashcard={flashcard} />
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-blue-500 hover:bg-blue-600" />
      <CarouselNext className="bg-blue-500 hover:bg-blue-600" />
    </Carousel>
  );
};

export default MainPage;
