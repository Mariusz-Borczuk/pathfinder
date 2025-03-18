
// SelectionControls.tsx
export const SelectionControls = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-4 p-4 bg-gray-100 rounded-lg">
      {children}
    </div>
  );
};