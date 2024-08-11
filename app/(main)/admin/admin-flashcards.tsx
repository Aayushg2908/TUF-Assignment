"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteFlashcard, editFlashcard } from "@/actions/flashcard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FlashcardSchema } from "@/lib/schema";
import { Flashcard } from "@prisma/client";
import { EditIcon, EllipsisVertical, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AdminFlashcards = ({ flashcard }: { flashcard: Flashcard }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FlashcardSchema>>({
    resolver: zodResolver(FlashcardSchema),
    defaultValues: {
      question: flashcard.question,
      answer: flashcard.answer,
    },
  });

  useEffect(() => {
    form.reset({
      question: flashcard.question,
      answer: flashcard.answer,
    });
  }, [flashcard]);

  async function onSubmit(values: z.infer<typeof FlashcardSchema>) {
    try {
      setIsLoading(true);
      const response = await editFlashcard({ id: flashcard.id, values });
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Flashcard updated successfully.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      form.reset();
      setIsOpen(false);
    }
  }

  const handleDelete = async () => {
    try {
      const response = await deleteFlashcard(flashcard.id);
      if (response.error) {
        return toast.error(response.error);
      } else {
        toast.success("Flashcard deleted successfully.");
      }
    } catch (error) {
      toast.error("Failed to delete flashcard.");
    }
  };

  return (
    <>
      <div className="w-full bg-neutral-800 shadow-md p-4 rounded-lg mb-4 flex items-center justify-between">
        <div className="w-full flex flex-col gap-y-2">
          <div className="text-xl font-bold">{flashcard.question}</div>
          <div className="text-base text-stone-200 line-clamp-2">
            {flashcard.answer}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={() => setIsOpen(true)}
              className="cursor-pointer"
            >
              <EditIcon className="size-6 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={handleDelete}
              className="cursor-pointer"
            >
              <Trash2 className="size-5 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Flashcard</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="What is the real name of Striver?"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="The Real name of Striver is Raj Vikramaditya."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit" className="w-full">
                Edit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminFlashcards;
