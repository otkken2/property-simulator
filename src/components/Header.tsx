import Link from "next/link";
import {useSession} from 'next-auth/react'

const Header = () => {
  const session = useSession().data;
  return (
    <div className="w-screen h-fit flex items-end justify-between max-w-[800px] m-auto">
      <div className="flex flex-col items-center">
        <Link href="/">
          <div className="w-[120px] h-[120px] text-4xl bg-primary text-white rounded-full text-center flex flex-col items-center justify-center">
            <p>ミエ</p>
            <p>ルカ</p>
          </div>
        </Link>
        <p>不動産投資をミエルカするアプリ</p>
      </div>
      <div className="text-center">
        {
          session ?
          <Link href='/mypage'>
            <button className="bg-primary text-white px-3 py-1 rounded-full hover:bg-primaryOnHover duration-300 transform">マイページ</button>
          </Link> 
          :
          <Link href='/auth'>
            <button className="bg-primary text-white px-3 py-1 rounded-full hover:bg-primaryOnHover duration-300 transform">ログイン</button>
          </Link>
        }
      </div>
    </div>
  );
};

export default Header;