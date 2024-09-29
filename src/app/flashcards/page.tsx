import { UserButton } from "@clerk/nextjs";
import Link from "next/link"; // Import Link for navigation

export default function Flashcards() {
  return (
    <>
      <header className="w-full bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-10">
        {/* App Name on the left */}
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          {/* Make the SmartCards text clickable to redirect to the homepage */}
          <Link href="/">
            SmartCards
          </Link>
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

      {/* Main content wrapper with padding to ensure it's below the header */}
      <main className="mt-20 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Your Flashcards
        </h1>

        {/* Card component */}
        <div className="bg-white dark:bg-gray-700 border shadow-md rounded-lg p-4 w-85 flex flex-col items-center">
          {/* Card Header */}
          <div className="bg-gray-200 dark:bg-gray-600 w-full rounded-t-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Header
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 p-20">
            This is a sample flashcard text for now. The actual flashcards will appear here after generation.
          </p>
        </div>
      </main>
    </>
  );
}
