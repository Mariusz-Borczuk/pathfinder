
/**
 * A functional component that wraps its children in a `div` element with specific styling.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The JSX content to be rendered inside the component.
 * @returns {JSX.Element} A `div` element containing the provided children, styled with flexbox and a gap.
 */
export const Content = ({ children: jsx }: { children: React.ReactNode }) => {
    return <div className="flex gap-[24px] flex-col ">{jsx}</div>;
  };