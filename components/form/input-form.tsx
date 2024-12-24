"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z
  .object({
    username: z.string({
      required_error: "Username is required.",
    }),
  })
  .required();

type InputFormProps = {
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
};

const InputForm = ({ setUsername, isLoading }: InputFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setUsername(values.username);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-5 justify-center sticky top-0 z-10 bg-primary-foreground dark:bg-background py-4"
      >
        <FormField
          control={form.control}
          name="username"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className=" max-w-md w-full">
              <FormControl>
                <Input placeholder="Enter your leetcode username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Generate card
        </Button>
      </form>
    </Form>
  );
};

export default InputForm;
