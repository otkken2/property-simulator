import StepNumber from "./StepNumber";

type Props = {
  currentStep: number;
};
export const StepBar = ({currentStep,}:Props) => {
  return (
    <div className="flex items-center justify-center">
      <StepNumber stepNumber={1} currentStep={currentStep}/>
      <div className="border-t  border-black w-16 h-0 "></div>
      <StepNumber stepNumber={2} currentStep={currentStep}/>
    </div>
  );
};