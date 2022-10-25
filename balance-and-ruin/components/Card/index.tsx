import React from 'react';

type Props = {
  children: React.ReactNode;
  title: React.ReactNode;
};

export default function Card({ children, title }: Props) {
  return (
    <div className="flex flex-col">
      {title && (
        <div className="border border-gray-200 bg-white px-4 py-4 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        </div>
      )}
      <div className="flex flex-col p-4 border border-gray-200 gap-2">{children}</div>
    </div>
  );
}
