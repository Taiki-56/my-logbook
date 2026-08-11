//* This is to show not found page.
//* Check app/[locale]/not-found.tsx and components/NotFoundPage.tsx

import { notFound } from "next/navigation";

const CatchAllPage = () => {
  notFound();
};

export default CatchAllPage;
