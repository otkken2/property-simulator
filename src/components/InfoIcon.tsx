interface Props {
  handleShowInfo?: () => void;
};

const InfoIcon = ({handleShowInfo}:Props) => {
  return (
    <div 
      className="border ml-3 rounded-full text-center h-5 w-5 flex items-center justify-center border-primary text-sm cursor-pointer"
      onClick={() => handleShowInfo && handleShowInfo()}
    >
      ?
    </div>
  );
};

export default InfoIcon;