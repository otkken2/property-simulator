const StemNumber = ({ stepNumber }: { stepNumber: number }) => {
  return (
    <div className="bg-primary w-[60px] h-[60px] rounded-full flex justify-center items-center text-white text-3xl">
      {stepNumber}
    </div>
  );
};

export default StemNumber;