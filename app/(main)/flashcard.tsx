"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Flashcard as PrismaFlashcard } from "@prisma/client";
import { useState } from "react";

const Flashcard = ({ flashcard }: { flashcard: PrismaFlashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <CarouselItem className="h-[500px]">
      <div className="flip-container w-full h-full">
        <div className={`flipper ${isFlipped ? "is-flipped" : ""}`}>
          <Card className="front">
            <CardContent
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full min-h-[200px] md:min-h-[300px] h-fit flex items-center justify-center p-6 cursor-pointer border-2"
            >
              <span className="text-3xl font-semibold text-center">
                {flashcard.question}
              </span>
            </CardContent>
          </Card>
          <Card className="back">
            <CardContent
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full min-h-[200px] md:min-h-[300px] h-fit flex items-center justify-center p-6 cursor-pointer border-2"
            >
              <span className="text-lg">{flashcard.answer}</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </CarouselItem>
  );
};

export default Flashcard;
