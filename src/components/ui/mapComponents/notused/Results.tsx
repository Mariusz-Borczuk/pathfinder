
// Results.tsx
export const Results = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-6 p-5 bg-gray-100 rounded-lg border-l-4 border-blue-600">
      {children}
    </div>
  );
};

// ResultText.tsx
export const ResultText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-base text-gray-800 mb-2 flex items-center gap-2">
      {children}
    </p>
  );
};

// ResultValue.tsx
export const ResultValue = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-semibold text-blue-600">{children}</span>;
};