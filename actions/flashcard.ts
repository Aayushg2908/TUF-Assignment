"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { FlashcardSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createFlashcard = async (
  values: z.infer<typeof FlashcardSchema>
) => {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    return redirect("/sign-in");
  }

  if (!user.isAdmin) {
    return { error: "You are not authorized to create flashcards." };
  }

  await db.flashcard.create({
    data: {
      userId: user.id,
      question: values.question,
      answer: values.answer,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: "Flashcard created successfully." };
};

export const getAllFlashcards = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    return redirect("/sign-in");
  }

  if (!user.isAdmin) {
    return redirect("/");
  }

  return await db.flashcard.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteFlashcard = async (flashcardId: string) => {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    return redirect("/sign-in");
  }

  if (!user.isAdmin) {
    return { error: "You are not authorized to delete flashcards." };
  }

  await db.flashcard.delete({
    where: {
      userId: user.id,
      id: flashcardId,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: "Flashcard deleted successfully." };
};

export const editFlashcard = async ({
  id,
  values,
}: {
  id: string;
  values: z.infer<typeof FlashcardSchema>;
}) => {
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    return redirect("/sign-in");
  }

  if (!user.isAdmin) {
    return { error: "You are not authorized to edit flashcards." };
  }

  await db.flashcard.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      question: values.question,
      answer: values.answer,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: "Flashcard updated successfully." };
};
