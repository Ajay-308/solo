import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/", // Allow landing page
  "/sign-in", // Allow sign-in page
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth(); // Require authentication for all other routes
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
