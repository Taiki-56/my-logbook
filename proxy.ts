/**
 * Next.js middleware configuration.
 *
 * Intercepts incoming requests to handle internationalization (i18n) routing
 * based on the user's locale and the defined routing strategy.
 */

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// * Matcher configuration to determine which paths the middleware runs on
export const config = {
  // * Match all pathnames except API routes, Next.js internals, and static files (e.g., favicon.ico)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
};
