// PathMapContainer.tsx
export const PathMapContainer = ({ children: jsx }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto p-6 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
      {jsx}
    </div>
  );
};