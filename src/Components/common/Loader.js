export const Loader = ({ fullScreen = false, bg = true }) => {
  const dimensions = fullScreen ? "w-screen h-screen" : "w-full h-full";
  const circle = fullScreen ? "w-12 h-12" : "h-5 w-5";
  return (
    <div
      className={`absolute top-0 left-0 ${
        bg && "bg-neutral-200"
      } flex items-center justify-center ${dimensions}`}
    >
      <svg
        className={`animate-spin ${circle} text-primary-300`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};
