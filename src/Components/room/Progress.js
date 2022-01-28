export const Progress = ({ current, total, played }) => {
  return (
    <div className="h-6 w-full flex items-center justify-center">
      {Array.from(new Array(total)).map((_, index) => {
        let color = "";
        if (index < current) {
          if (played[index]?.result?.name === "WIN") {
            color = "bg-green-300";
          } else if (played[index]?.result?.name === "DRAW") {
            color = "bg-blue-300";
          } else {
            color = "bg-red-300";
          }
        } else if (current === index) {
          color = "bg-primary-300";
        } else {
          color = "bg-gray-200";
        }
        return (
          <div
            key={index}
            className={`flex-1 h-2 mx-2 first:ml-0 last:mr-0 rounded-full ${color} transition ease-in-out duration-300`}
          />
        );
      })}
    </div>
  );
};
