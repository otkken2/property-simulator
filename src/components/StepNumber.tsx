import { type } from "os";

type Props = {
  stepNumber: number;
  currentStep: number; 
};
const StepNumber = ({ stepNumber, currentStep }: Props) => {
  console.log("currentStep", currentStep);
  console.log("stepNumber", stepNumber);
  return (
    <div className={`${currentStep < stepNumber ? 'bg-white border border-primary text-gray-400' : 'bg-primary' } w-[60px] h-[60px] rounded-full flex justify-center items-center text-white text-3xl`}>
      {stepNumber}
    </div>
  );
};

export default StepNumber;