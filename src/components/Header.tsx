import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full h-fit flex items-center justify-between">
      <Link href="/">
        <div className="w-[120px] h-[120px] text-4xl bg-primary text-white rounded-full text-center flex flex-col items-center justify-center">
          <p>ミエ</p>
          <p>ルカ</p>
        </div>
      </Link>
      <p>不動産投資をミエルカ</p>
    </div>
  );
};

export default Header;