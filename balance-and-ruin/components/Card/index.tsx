import React from 'react';

type Props = {
  children: React.ReactNode;
  /** Class name to be applied to both  */
  className: string;
  title: React.ReactNode;
};

export default function Card({ children, className, title }: Props) {
  return (
    <div className={`bg-white shadow-md border-l-8 ${className}`}>
      {title && (
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500"></p>
        </div>
      )}
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        {/* <dl className="gap-x-4 gap-y-8">{children}</dl> */}
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1">{children}</dl>
      </div>
    </div>
  );
}
