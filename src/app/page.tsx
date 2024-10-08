"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for client-side navigation
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter(); // Initialize the router

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleGenerateClick = async () => {
    if (!prompt.trim()) return; // Prevent generation for empty prompt

    setIsGenerating(true);
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [
              {
                role: "user",
                content: `Generate 5 distinct flashcards on the topic of ${prompt}. Each flashcard should have a question and a short, concise answer.`,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.choices[0].message);

      // Redirect to flashcards page after generation
      router.push("/flashcards"); // Use router.push for client-side navigation
    } catch (error) {
      console.error("Error generating flashcards:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Sticky Header with Dark Mode Support */}
      <header className="w-full bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-10">
        {/* App Name on the left */}
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          SmartCards
        </div>

        {/* Right-side options: Saved Cards button and UserButton for profile/logout */}
        <div className="flex items-center space-x-4">
          {/* Button to Saved Cards page */}
          <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded">
            Saved Cards
          </button>

          {/* Clerk's UserButton for profile management and logout */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] mt-16">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          AI Flashcards Generator
        </h1>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          Enter a prompt to generate flashcards using AI.
        </p>
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Enter a prompt"
            value={prompt}
            onChange={handlePromptChange}
            className="border rounded-l px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-600"
          />
          <button
            onClick={handleGenerateClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r"
            disabled={isGenerating || !prompt.trim()} // Disable button if prompt is empty or generating
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>
      </main>
    </>
  );
}
