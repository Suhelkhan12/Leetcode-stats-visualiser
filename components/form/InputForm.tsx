"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LeetCodeStatsCard from "../leetcode-card/leetcode-card";

const InputForm = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the submission,
    // such as fetching the user's LeetCode data and displaying the stats card
    console.log("Submitted username:", username);
  };
  return (
    <section aria-labelledby="generate-heading">
      <h2 id="generate-heading" className="text-2xl font-bold mb-4 text-center">
        Generate Your Stats Card
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto sticky top-4 z-10  bg-primary-foreground py-2 px-4 rounded-md dark:bg-background"
      >
        <Input
          type="text"
          placeholder="Enter your LeetCode username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-grow"
          aria-label="LeetCode username"
        />
        <Button type="submit">Generate Stats Card</Button>
      </form>
      <LeetCodeStatsCard />
    </section>
  );
};

export default InputForm;
