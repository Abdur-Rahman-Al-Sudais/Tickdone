import React from "react";
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  return (
    <footer className="py-6 mt-10 dark:border-gray-700">
      <Separator className="mb-2" />
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-400 md:mt-0 m-auto">
          &copy; {new Date().getFullYear()} TickDone. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
