import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Member {
  id: string;
  name: string;
  avatar: string;
}

interface AvatarGroupProps {
  members: Member[];
  max?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  members,
  max = 3,
}) => {
  const visibleMembers = members.slice(0, max);
  const remainingCount = members.length - max;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {visibleMembers.map((member) => (
        <Avatar
          key={member.id}
          className="inline-block border-2 border-background"
        >
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar className="inline-block border-2 border-background bg-gray-300">
          <AvatarFallback>+{remainingCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
