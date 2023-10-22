import InfoIcon from "./InfoIcon";

interface Props {
  itemLabel: string;
  itemValue: number;
  handleClick?: () => void;
};
const ResultItem = ({itemLabel, itemValue, handleClick}:Props) => {
  return (
    <div 
      className={`flex justify-between mb-3 cursor-pointer hover:font-bold`}
      onClick={() => handleClick && handleClick()}
    >
      <p>{itemLabel}:</p>
      <div className="flex items-center">
        <p>{itemValue}万円</p>
        <p><InfoIcon/></p>
      </div>
    </div>
  );
};

export default ResultItem;