import StemNumber from "./StepNumber";

export const StepBar = () => {
  return (
    <div className="flex items-center justify-center">
      <StemNumber stepNumber={1}/>
      <div className="border-t  border-black w-16 h-0 "></div>
      <StemNumber stepNumber={2}/>
    </div>
  );
};