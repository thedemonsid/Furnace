"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

const Navigator = () => {
  const pathname = usePathname(); // returns {/dashboard/xyz}
  // function to extract all the pathnames
  const path = pathname.split("/").filter(Boolean);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">Building Your Project</BreadcrumbLink>
        </BreadcrumbItem>
        {path.map((item, index) => {
          const isLast = index === path.length - 1;
          return (
            <div key={index} className="flex items-center">
              <BreadcrumbSeparator className="hidden md:block" />
              {isLast ? (
                <BreadcrumbPage key={index} className="hidden md:block">
                  {item.toUpperCase()}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbItem key={index} className="hidden md:block">
                  <BreadcrumbLink href={`/${item}`}>
                    {item.toUpperCase()}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Navigator;
