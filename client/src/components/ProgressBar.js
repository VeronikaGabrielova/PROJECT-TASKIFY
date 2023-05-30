const ProgressBar = ({ progress }) => {
  const colors = [
    "rgb(165,190,0)",
    "rgb(103,148,54)",
    "rgb(82, 150, 165)",
    "rgb(255, 116, 119)",
    "rgb(251, 77, 61)",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
  );
};

export default ProgressBar;
