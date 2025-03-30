/**
 * A functional component that renders a container for radio button controls.
 * It applies flexbox styling with a gap between child elements.
 *
 * @param children - The child elements to be rendered inside the container.
 */
export const RadioControl = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-1.5">{children}</div>;
};
/**
 * A functional component that renders a label for a radio button.
 * It associates the label with a specific radio button using the `htmlFor` attribute.
 *
 * @param htmlFor - The `id` of the radio button this label is associated with.
 * @param children - The content to be displayed inside the label.
 */
export const RadioLabel = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <label htmlFor={htmlFor} className="text-sm text-gray-600 cursor-pointer">
      {children}
    </label>
  );
};
