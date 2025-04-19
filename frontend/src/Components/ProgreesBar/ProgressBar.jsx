import { useEffect, useState } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ progress }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (progress > 0 && progress < 100) setVisible(true);

    if (progress === 100) {
      // Give time for animation to finish before hiding
      const timeout = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div className="outer">
      <div className="inner" role="progressbar" style={{transform: `translateX(${progress - 100}%)`}} aria-valuemax="100" aria-valuemin="0" aria-valuenow={progress}></div>
    </div>
  );
};

export default ProgressBar;