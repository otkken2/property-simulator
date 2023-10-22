import InfoIcon from "./InfoIcon";

type Props = {
  label: string;
  value: number | undefined;
  isExistInfo?: boolean;
  handleShowInfo?: () => void;
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({label, value,isExistInfo, handleShowInfo, onChangeFunc}: Props) => {
  
  return (
    <div className="">
      <div className="flex text-center justify-center items-center mt-5 mb-2">
        <h3 className="text-center">{label}</h3>
        {isExistInfo && 
          <InfoIcon handleShowInfo={handleShowInfo}/>
        }
      </div>
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