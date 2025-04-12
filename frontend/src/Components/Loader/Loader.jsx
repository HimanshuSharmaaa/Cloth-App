import "./Loader.css";

const Loader = ({ load }) => {
  if (load !== 0) {
    return (
      <div className={`outer ${load===100?"display":""}`}>
        <div className='inner' role="progressbar"
          style={{ transform: `translateX(${load - 100}%)` }} aria-valuemax="100" aria-valuemin="0" aria-valuenow={load}></div>
      </div>
    );
  }
};

export default Loader;