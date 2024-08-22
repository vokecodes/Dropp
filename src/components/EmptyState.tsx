import React from "react";
import Button from "./Button";

type IEmptyStateProps = {
  title: string;
  buttonText?: string;
  onButtonClick?: Function;
};

const EmptyState = ({ title, buttonText, onButtonClick }: IEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center">
      <img src="/images/empty-order.svg" alt="empty" />
      <h2 className="text-xl input_text mb-3">{title}</h2>
      {buttonText && (
        <Button
          title={buttonText}
          extraClasses="py-4"
          onClick={onButtonClick}
        />
      )}
    </div>
  );
};

export default EmptyState;
