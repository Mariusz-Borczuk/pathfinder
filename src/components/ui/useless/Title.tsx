// Title.tsx
export const Title = ({ children: jsx }: { children: React.ReactNode }) => {
  return (
    <div className="flex text-[28px] text-[#333333] items-m-0  font-bold">
      {jsx}
    </div>
  );
};
