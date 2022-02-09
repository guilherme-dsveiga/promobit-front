function ProgressCircle({ progress }) {
  return (
    <div className="relative w-[80px] font-roboto">
      <div className="relative flex justify-center items-center">
        <div className="absolute text-lime rounded-full w-[60px] h-[60px] flex bg-purple-progress justify-center items-center font-bold text-lg">
          {`${progress}%`}
        </div>
        <div
          className="w-[80px] h-[80px] rounded-full"
          style={{
            background: `conic-gradient(#14FF00 ${progress}%,  #51485F ${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressCircle;
