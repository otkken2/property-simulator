type Props = {
  children: React.ReactNode;
};

const ResultDisplayWrapper: React.FC<Props> = (props) => {
  return (
    <div className="border border-primary rounded-2xl bg-gray-200 w-[350px] m-auto p-5 text-xl">
      {props.children}
    </div>
  );
};

export default ResultDisplayWrapper;