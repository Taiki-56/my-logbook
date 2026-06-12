import Biography from "./parts/Biography";
import CoreFocus from "./parts/CoreFocus";
import Profile from "./parts/Profile";
import Trajectory from "./parts/Trajectory";

const Page = () => {
  return (
    <div className="max-w-300 mx-auto px-4 lg:px-6 pb-16">
      {/* Mobile Layout */}
      <div className="flex flex-col gap-8 py-12 lg:hidden">
        <Profile />
        <CoreFocus />
        <Biography />
        <Trajectory />
      </div>
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8 py-12">
        <div className="lg:col-span-4 flex flex-col gap-8">
          <Profile />
          <CoreFocus />
        </div>
        <div className="lg:col-span-8 flex flex-col gap-16">
          <Biography />
          <Trajectory />
        </div>
      </div>
    </div>
  );
};

export default Page;
