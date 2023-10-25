import useSWR from "swr";
import axios from "axios";

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

  const { data: results, error }: Props= useSWR(`/api/simulationResults/${1}`,fetcher);
  // const { data: results, error }= useSWR(`/api/simulationResults/${1}`,fetcher);
  
  if(error) return <div>failed to load</div>;
  if(!results) return <div>loading...</div>;

  console.log(results)
  return (
    <div>
      <h1>マイページ</h1>

      <ul>
        {results.map((result)=> {
          return (
            <div key={result.id}>
              <li>{result.name}</li>
              <li>{result.property_price}</li>
              <li>{result.property_tax_value}</li>
              <li>{result.monthly_rent_income}</li>
              <li>{result.urban_planning_tax}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default MyPage;