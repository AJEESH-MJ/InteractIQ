import React from "react";

const AvatarImage = ({ userId, name, width = 2, height = 2 }) => {
  if (!userId || !name) {
    return null;
  }

  const colors = [
    "bg-red-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-indigo-200",
    "bg-purple-200",
    "bg-teal-200",
  ];

  const userIdBase10 = parseInt(userId, 16);

  if (isNaN(userIdBase10)) {
    return null;
  }

  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  const containerStyle = {
    width: `${width}rem`,
    height: `${height}rem`,
  };

  return (
    <div
      className={`rounded-full flex items-center ${color}`}
      style={containerStyle}
    >
      <div className="text-center w-full">{name[0]}</div>
    </div>
  );
};

export default AvatarImage;
