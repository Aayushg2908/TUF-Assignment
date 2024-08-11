"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Flashcard as PrismaFlashcard } from "@prisma/client";
import { useState } from "react";

const Flashcard = ({ flashcard }: { flashcard: PrismaFlashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <CarouselItem className="h-[500px]">
      <Card>
        <CardContent
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full min-h-[200px] md:min-h-[300px] h-fit flex items-center justify-center p-6 cursor-pointer border-2"
        >
          {!isFlipped ? (
            <span className="text-3xl font-semibold text-center transition-all duration-500">
              {flashcard.question}
            </span>
          ) : (
            <span className="text-lg transition-all duration-500">
              {flashcard.answer}
            </span>
          )}
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default Flashcard;
