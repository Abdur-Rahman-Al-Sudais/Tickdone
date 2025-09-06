import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CheckSquare, Rocket, Star } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50 dark:bg-neutral-950 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-primary">TickDone</span>
        </h1>
        <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-600 dark:text-gray-300">
          A modern todo manager to help you stay productive, organized, and on
          top of your daily tasks. Tick them off one by one — and get things
          done!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/todos">
            <Button size="lg" className="px-6 py-3 rounded-xl cursor-pointer">
              Get Started
            </Button>
          </Link>
          <Link to="/about">
            <Button
              size="lg"
              variant="outline"
              className="px-6 py-3 rounded-xl cursor-pointer"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl">
        <div className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-md">
          <CheckSquare className="w-10 h-10 text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Manage Tasks</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Organize your todos into one simple, easy-to-use interface.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-md">
          <Rocket className="w-10 h-10 text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Boost Productivity</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Stay focused and achieve more with less effort.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-md">
          <Star className="w-10 h-10 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Simple & Clean</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            A minimal UI that works beautifully in both light & dark mode.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
