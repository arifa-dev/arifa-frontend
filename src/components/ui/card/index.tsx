import React from "react";
import "./index.scss";

interface ICard {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<ICard> = ({ children, className }) => {
  return (
    <div className={`card__container ${className ? className : ""} `}>
      {children}
    </div>
  );
};
