interface Props {
  onClickFunc: () => void;
  label: string;
}

export const ButtonPrimary = ({onClickFunc, label}:Props) => {
  return (
    <button onClick={() => onClickFunc()} className="bg-sky-400 text-white px-5 py-2 rounded-full w-[340px] m-auto">{label}</button>
  );
};