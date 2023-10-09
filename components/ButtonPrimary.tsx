interface Props {
  onClickFunc: () => void;
  label: string;
}

export const ButtonPrimary = ({onClickFunc, label}:Props) => {
  return (
    <button onClick={() => onClickFunc()} className="mb-20 bg-sky-400 text-white px-5 py-2 rounded-2xl w-[340px]">{label}</button>
  );
};