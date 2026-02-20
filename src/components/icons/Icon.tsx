import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { twMerge } from "tailwind-merge";

interface IconProps {
  icon: IconDefinition;
  className?: string;
  spin?: boolean;
}

export const Icon: React.FC<IconProps> = ({ icon, className, spin }) => {
  return (
    <FontAwesomeIcon 
      icon={icon} 
      className={twMerge("w-5 h-5", className)} 
      spin={spin} 
    />
  );
};