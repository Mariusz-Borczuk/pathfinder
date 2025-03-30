
// SecondaryButton.tsx
export const SecondaryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="px-5 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out hover:bg-gray-400 hover:-translate-y-0.5 active:translate-y-0"
    >
      {children}
    </button>
  );
};