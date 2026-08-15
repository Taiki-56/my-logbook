/**
 * About page. Composes profile, biography, experience, tech stack, and core focus sections
 * into separate mobile and desktop layouts.
 */

import Biography from "./parts/Biography";
import CoreFocus from "./parts/CoreFocus";
import Experiences from "./parts/Experiences";
import Profile from "./parts/Profile";
import TechStack from "./parts/TechStack";

const Page = () => {
  return (
    <div className="max-w-384 w-full mx-auto px-4 lg:px-8 pb-16">
      {/* Mobile Layout */}
      <div className="flex flex-col gap-10 py-8 lg:hidden">
        <Profile />
        <Biography />
        <Experiences />
        <TechStack />
        <CoreFocus />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-24 py-16">
        <div className="lg:col-span-5 flex flex-col gap-10">
          <Profile />
          <TechStack />
          <CoreFocus />
        </div>

        <div className="lg:col-span-7 flex flex-col gap-16 mt-4">
          <Biography />
          <Experiences />
        </div>
      </div>
    </div>
  );
};

export default Page;
