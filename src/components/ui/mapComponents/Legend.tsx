/**
 * A component that renders a collapsible legend using Radix UI's Accordion.
 * It displays a list of child elements passed to it, wrapped in a styled container.
 *
 * @param children - The content to be displayed inside the legend.
 */
/**
 * A component that represents an individual item in the legend.
 * It displays a label alongside a colored square.
 *
 * @param label - The text label for the legend item.
 * @param bgColor - The background color of the square.
 */
/**
 * A component that renders styled text for use within the legend.
 *
 * @param children - The text content to be displayed.
 */
/**
 * A component that renders a small square with a specified background color.
 *
 * @param bgColor - The background color of the square.
 */
import * as Accordion from "@radix-ui/react-accordion";
import React from "react";
export const Legend = ({ children }: { children: React.ReactNode }) => {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="w-full max-w-lg bg-white shadow rounded-lg"
    >
      <Accordion.Item value="legend" className="border-b">
        <Accordion.Header>
          <Accordion.Trigger className="flex items-center gap-4 p-4 text-gray-800 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <svg
              className="w-5 h-5 transition-transform transform rotate-180 data-[state=open]:rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Legend
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
