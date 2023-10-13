
type Props = {
  text: string;
};


const ButtonWithBorder = ({text}: Props) => {
  return <div className="w-[300px] border border-primary text-center rounded-full py-2 hover:bg-primary cursor-pointer duration-300 ease-in-out transition-colors">{text}</div>
};

export default ButtonWithBorder;