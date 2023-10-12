type Props = {
  label: string;
  value: number | undefined;
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({label, value, onChangeFunc}: Props) => {
  return (
    <div className="">
      <h3 className="text-center mt-5 mb-2">{label}</h3>
      <div className="relative w-[350px] m-auto">
        <input 
          type="text" 
          value={value} 
          onChange={onChangeFunc}
          className="border border-primary rounded-full w-full h-12 pl-5 pr-14"
        />
        <span className="absolute right-5 translate-y-1/2">万円</span>
      </div>
    </div>
  );
};