import * as Accordion from "@radix-ui/react-accordion";
import React from "react";


// Legend.tsx
export const Legend = ({ children }: { children: React.ReactNode }) => {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="w-full max-w-lg bg-white shadow rounded-lg"
    >
      <Accordion.Item value="legend" className="border-b">
        <Accordion.Header>
          <Accordion.Trigger className="w-full flex justify-between items-center p-4 text-gray-800 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Legend
            <svg
              className="w-5 h-5 transition-transform transform rotate-0 data-[state=open]:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="p-4 bg-gray-50">
          <div className="flex flex-row flex-wrap gap-6 w-full items-center justify-start">
            {children}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

// LegendItem.tsx
export const LegendItem = ({
  label,
  bgColor,
}: {
  label: string;
  bgColor: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded-sm"
        style={{ backgroundColor: bgColor }}
      ></div>
      <span className="text-sm text-gray-600 font-medium">{label}</span>
    </div>
  );
};

export const LegendText = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-sm text-gray-600 font-medium">{children}</span>;
};
// ColorSquare.tsx
export const ColorSquare = ({ bgColor }: { bgColor: string }) => {
  return (
    <div
      className="w-4 h-4 rounded-sm"
      style={{ backgroundColor: bgColor }}
    ></div>
  );
};
