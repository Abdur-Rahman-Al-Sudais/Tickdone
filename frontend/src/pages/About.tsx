import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ClipboardList, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50 dark:bg-neutral-950 text-gray-800 dark:text-gray-200">
      <div className="max-w-3xl text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-primary">TickDone</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl leading-relaxed mb-10 text-gray-600 dark:text-gray-300">
          TickDone is your simple and powerful task manager. Whether you’re
          planning your day, keeping track of goals, or managing projects, we
          help you stay productive and organized — so you can focus on what
          really matters.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-md">
            <CheckCircle2 className="w-10 h-10 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Stay Organized</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Keep all your tasks in one place and never miss a deadline again.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-md">
            <ClipboardList className="w-10 h-10 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Easy to Use</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A clean and simple interface designed to make task management
              effortless.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-md">
            <Clock className="w-10 h-10 text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Save Time</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Focus on your priorities and let TickDone handle the rest.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <Link to="/todos">
          <Button size="lg" className="px-6 py-3 rounded-xl cursor-pointer">
            Start Organizing Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
