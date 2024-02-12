interface Props {
  onClickFunc: () => void;
  label: string;
}

export const ButtonPrimary = ({onClickFunc, label}:Props) => {
  return (
    <button onClick={() => onClickFunc()} className="bg-primary text-white px-5 py-2 rounded-full w-[340px] m-auto hover:bg-primaryOnHover transform duration-300">{label}</button>
  );
};