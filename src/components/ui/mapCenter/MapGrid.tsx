
/**
 * A React functional component that renders a grid layout for a map.
 * 
 * The grid is styled using Tailwind CSS classes to create a 60x60 grid
 * with each cell having a size of 15px by 15px, separated by a 0.5px gap.
 * The grid is centered horizontally with padding, a gray background,
 * rounded corners, and an inner shadow effect.
 * 
 * @component
 * @returns {JSX.Element} The rendered grid layout for the map.
 */
export const MapGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 mx-auto bg-gray-100 rounded-lg shadow-inner">
      <div
        className="grid grid-cols-[repeat(60,15px)] grid-rows-[repeat(60,15px)] gap-[1px] mx-auto"
      >
        {Array.from({ length: 60 * 60 }).map((_, index) => (
          <div
            key={index}
            className="bg-white hover:bg-gray-50 transition-colors duration-100"
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};
