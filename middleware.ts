import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Allow access to the sign-in route without authentication
    '/signin', // Adjust this if your route is different
    // Allow access to the catch-all route for Clerk
    '/((?!.*))', // Ensure this matches your catch-all route pattern
  ],
};
