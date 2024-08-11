"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FlashcardSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFlashcard } from "@/actions/flashcard";
import { toast } from "sonner";

const CreateNewDialog = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FlashcardSchema>>({
    resolver: zodResolver(FlashcardSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function onSubmit(values: z.infer<typeof FlashcardSchema>) {
    try {
      setIsLoading(true);
      const response = await createFlashcard(values);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Flashcard created successfully.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="max-sm:w-full">
          <PlusIcon className="size-5 mr-1" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Flashcard</DialogTitle>
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
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewDialog;
