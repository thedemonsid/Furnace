import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { ExternalLink, BookmarkPlus } from "lucide-react";
import Link from "next/link";

interface ResourceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  link: string;
}

const ResourceCard = ({
  title,
  description,
  imageUrl,
  category,
  link,
}: ResourceCardProps) => {
  return (
    <Card className="w-full md:w-[350px] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="relative h-[180px] w-full overflow-hidden">
        <Image
          src={imageUrl || "/image.jpg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 350px"
        />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
        >
          {category}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {description.substring(0, 60)}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>

      <CardFooter className="pt-2 flex justify-between">
        <Link href={link}>
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center gap-2"
          >
            <span>View Resource</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </Link>

        <Button variant="ghost" size="icon" className="ml-2">
          <BookmarkPlus className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
