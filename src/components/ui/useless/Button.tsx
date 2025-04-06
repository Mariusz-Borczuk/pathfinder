// /**
//  * A reusable button component with customizable children and an optional click handler.
//  *
//  * @param {Object} props - The props for the Button component.
//  * @param {React.ReactNode} props.children - The content to be displayed inside the button.
//  * @param {() => void} [props.onClick] - An optional click event handler for the button.
//  *
//  * @returns {JSX.Element} A styled button element.
//  */
// export const Button = ({
//   children,
//   onClick,
// }: {
//   children: React.ReactNode;
//   onClick?: () => void;
// }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out hover:bg-blue-500 hover:-translate-y-0.5 active:translate-y-0"
//     >
//       {children}
//     </button>
//   );
// };
