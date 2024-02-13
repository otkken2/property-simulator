import useSWR from "swr";
import axios from "axios";
import Header from "@/components/Header";
import { getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { GetSimulationResult } from "@/utils/types";
import Link from "next/link";
import {format} from 'date-fns'



interface Props{
  data: GetSimulationResult[],
  error: any,
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession({req: context.req})

  

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session,
    }
  }
};

interface Props {
  session: Session;
}

const MyPage: React.FC<Props> = ({ session }) => {

  const formatDate = (date: Date | string): string => {
    return format(new Date(date), 'yyyy/MM/dd/HH:mm:ss');
  }
  // const router = useRouter();
  // const { data: sessionData } = useSession();
  const fetcher = (url: string) => axios.get<GetSimulationResult[]>(url).then(res => res.data);
  const { data : results, error } = useSWR(`/api/simulationResults`, fetcher);

  return (
    <main>
      <Header/>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-10 mt-10">マイページ</h1>
        <h2 className="text-xl mb-5">保存結果一覧</h2>
        {results && results.length > 0 ?  
          <div className="max-w-[95vw] overflow-x-scroll m-auto">
            <table className="table-auto border rounded-lg ">
                <thead className="border-b">
                  <tr className=" whitespace-nowrap">
                    <th className="border-r py-3 px-5">ID</th>
                    <th className="border-r py-3 px-5">名前</th>
                    <th className="border-r py-3 px-5">物件価格</th>
                    <th className="border-r py-3 px-5">物件税評価額</th>
                    <th className="border-r py-3 px-5">月額賃貸収入</th>
                    <th className="border-r py-3 px-5">月額管理費</th>
                    <th className="border-r py-3 px-5">年間固定資産税</th>
                    <th className="border-r py-3 px-5">都市計画税</th>
                    <th className="border-r py-3 px-5">更新日</th>
                    <th className="border-r py-3 px-5">作成日</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    results.map(eachData => (
                      <tr key={eachData.id} className="border-b whitespace-nowrap">
                        <td className=" border-r px-5 py-2">{eachData.id}</td>
                        <td className=" border-r px-5 py-2">{eachData.name}</td>
                        <td className=" border-r px-5 py-2">{eachData.property_price}</td>
                        <td className=" border-r px-5 py-2">{eachData.property_tax_value}</td>
                        <td className=" border-r px-5 py-2">{eachData.monthly_rent_income}</td>
                        <td className=" border-r px-5 py-2">{eachData.monthly_management_fee}</td>
                        <td className=" border-r px-5 py-2">{eachData.annual_property_tax}</td>
                        <td className=" border-r px-5 py-2">{eachData.urban_planning_tax}</td>
                        <td className=" border-r px-5 py-2">{eachData.updated_at ? formatDate(eachData.updated_at) : 'N/A'}</td>
                        <td className=" border-r px-5 py-2">{ formatDate(eachData.created_at)}</td>
                      </tr>
                    ))
                  }
              </tbody>
            </table>
          </div>
          :
          <p>未だ保存された計算結果はありません</p>
        }
        <Link href="/auth">
          <button className="mt-20 text-red-500 border px-5 py-1 rounded-full">ログアウト</button>
        </Link>
      </div>
    </main>
  );
};

export default MyPage;