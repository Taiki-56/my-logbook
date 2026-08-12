/**
 * Catch-all route for any unmatched path under [locale]; triggers the not-found page.
 * See app/[locale]/not-found.tsx and components/common/NotFoundPage.tsx.
 */

import { notFound } from "next/navigation";

const CatchAllPage = () => {
  notFound();
};

export default CatchAllPage;
