import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import BlogCard from "./blog-card";

const BlogsComponent = () => {
  return (
    <main className="flex flex-col justify-start w-full p-6 bg-background text-foreground h-screen">
      <div className="flex flex-wrap justify-between items-center mb-6 p-2 px-4 w-full">
        <div className="flex space-x-4 w-full md:w-1/2 mb-4 md:mb-0">
          <div className="relative">
            <Input
              placeholder="Find a Resource"
              className="w-full text-sm pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
          <Button variant="outline" className="text-sm">
            Filter
          </Button>
        </div>
        <div className="flex space-x-4">
          <Button>Add Resource</Button>
        </div>
      </div>
      <div className="flex justify-between flex-wrap gap-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <BlogCard
            key={index}
            title={`My Card ${index + 1}`}
            description="Basic description for the resources"
            imageUrl="/image.png"
            link="https://nextjs.org/docs/pages/api-reference/components/link"
            category="none"
          />
        ))}
      </div>
    </main>
  );
};

export default BlogsComponent;
