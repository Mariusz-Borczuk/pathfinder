
/**
 * A functional component that serves as a container for child elements.
 * It applies specific styling to arrange its children in a flexible, wrapped layout
 * with spacing between them.
 *
 * @param children - The React nodes to be rendered inside the container.
 * @returns A styled `div` element wrapping the provided children.
 */
export const Controls = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-wrap gap-3 my-4">{children}</div>;
};