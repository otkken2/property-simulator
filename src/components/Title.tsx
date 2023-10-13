type Props = {
  text: string;
};

const Title = ({text}: Props) => {
  return (
    <h1 className="text-2xl text-center mt-5 sm:text-4xl mb-10">{text}</h1>
  );
};

export default Title;