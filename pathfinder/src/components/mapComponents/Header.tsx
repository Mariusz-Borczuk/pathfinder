// Header.tsx
export const Header = ({ children: jsx }: { children: React.ReactNode }) => {
    return <div className="flex justify-between items-center mb-6">{jsx}</div>;
  };