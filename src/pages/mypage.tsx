import useSWR from "swr";
import axios from "axios";
import Header from "@/components/Header";

const fetcher = (url:string) => axios.get(url).then(res => res.data);
interface GetSimulationResults {
  id: number,
  user_id: number,
  name: string,
  property_price: number,
  property_tax_value: number,
  monthly_rent_income: number,
  monthly_management_fee: number,
  annual_property_tax: number,
  urban_planning_tax: number,
  updated_at?: string,
  created_at: string,
};

interface Props{
  data: GetSimulationResults[],
  error: any,
};

const MyPage = () => {
  return (
    <main>
      <Header/>
      <div className="text-center">
        <h1 className="text-2xl font-bold">マイページ</h1>
        保存結果一覧
      </div>
    </main>
  );
};

export default MyPage;