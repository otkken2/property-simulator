import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react"

const Login = () => {
  const session = useSession().data
  const handleAuth = () => {
    if(session){
      signOut({callbackUrl: '/'})
      return
    }else{
      signIn('google',{callbackUrl: '/'})
    }
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <div className=" text-center h-72 flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl mb-10">{session ? 'ログアウト': 'ログイン'}</h1>
        <button 
          className="border-gray-400 border py-1 px-5 rounded-full hover:bg-slate-200 transform ease-in-out duration-300 flex items-center "
          onClick={() => handleAuth()}
        >
          {session ? 
              <span>ログアウトする</span>
          :
            <>
              <Image src='/google.png' alt="google" width='40' height='40' className="mr-4"/>
              Googleでログイン
            </>
          }
        </button>
      </div>
    </main>
  );
};

export default Login;