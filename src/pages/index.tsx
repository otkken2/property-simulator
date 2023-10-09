import Link from "next/link";
import { useEffect, useState } from "react"
import { ButtonPrimary } from "../../components/ButtonPrimary";


export default function Home() {
  const [propertyPrice, setPropertyPrice] = useState<number| undefined>();
  const [koteiShisanZeiHyoukaGaku, setKoteiShisanZeiHyoukaGaku] = useState<number | undefined>();
  const [showResults, setShowResults] = useState<boolean>(false);
  const [totalResult, setTotalResult] = useState<number>(0);

  const [tyukai, setTyukai] = useState(0);
  const [inshizei, setInshizei] = useState(0);
  const [tourokumenkyozei, setTourokumenkyozei] = useState(0);
  const [hudousansyutokuzei, setHudousansyutokuzei] = useState(0);
  const SHIHOUSHOSHI_HOUSYU = 5;

  {/* //入力項目 : 月額家賃収入(必須)、管理費、固定資産税(必須)、都市計画税(必須)*/}
  const [monthlyRentIncome, setMonthlyRentIncome] = useState<number | undefined>();
  const [managementFee, setManagementFee] = useState<number | undefined>();
  const [fixedAssetTax, setFixedAssetTax] = useState<number | undefined>();
  const [cityPlanningTax, setCityPlanningTax] = useState<number | undefined>();
  const [realRent, setRealRent] = useState<number | undefined>();

  const [realRateOfReturn, setRealRateOfReturn] = useState<number | undefined>();

  useEffect(()=>{
    setTotalResult(tyukai+inshizei+tourokumenkyozei+hudousansyutokuzei + SHIHOUSHOSHI_HOUSYU);
  },[hudousansyutokuzei, inshizei, tourokumenkyozei, tyukai]);

  const convertManYenToYen = (manYen: number): number => {
    return manYen*10000;
  };
  const convertYenToManYen = (yen: number): number => {
    return yen/10000;
  };



  const calcTyukai = (): number| null => {
    if(!propertyPrice || propertyPrice < 0)return null;
    const taxRate = 0.05;
    let zeinukiTesuryou: number = 0;
    let tax: number = 0;

    if(propertyPrice <= 200){
      console.log("200万円以下")
        zeinukiTesuryou = propertyPrice*0.05  //物件価格の5%
        tax = zeinukiTesuryou*taxRate; //消費税10%
    }else if(propertyPrice <= 400){
        console.log("200万円以上400万円以下")
        zeinukiTesuryou = propertyPrice*0.04 + 2  //物件価格の4%+2万円
        tax = zeinukiTesuryou*taxRate; //消費税10%
    }else if(propertyPrice > 400){
        console.log("400万円以上")
        zeinukiTesuryou = propertyPrice*0.03 + 6 //物件価格の3%+6万円
        tax = zeinukiTesuryou*taxRate;
    }

    const result = zeinukiTesuryou+tax;
    setTyukai(result);
    return result;
  };




  const calcInshizei = () => {
    if(!propertyPrice || propertyPrice < 0)return null;

    let result: number = 0;
    if(propertyPrice < 1){ //1万円未満の場合、非課税
      result = 0;
    }else
    if(propertyPrice >= 1 && propertyPrice <= 10){//1万円以上~10万以下の場合
      result = convertYenToManYen(200);
    }else 
    if (propertyPrice > 10 && propertyPrice <= 50){//10万を超えて50万以下の場合
      result = convertYenToManYen(400);
    }else 
    if (propertyPrice > 50 && propertyPrice <= 100){//50万を超え100万以下の場合
      result = convertYenToManYen(1000);
    }else
    if (propertyPrice > 100 && propertyPrice <= 500){//売買価格100万を超え500万以下の場合
      result = convertYenToManYen(2000);
    }else
    if (propertyPrice > 500 && propertyPrice <= 1000){//売買価格500万を超え1千万以下の場合
      result = convertYenToManYen(10000);
    }else
    if (propertyPrice > 1000 && propertyPrice <= 5000){//売買価格１千万を超え5千万以下の場合
      result = convertYenToManYen(20000);
    }else
    if (propertyPrice > 5000 && propertyPrice <= 10000){//売買価格5千万を超え1億以下の場合
      result = convertYenToManYen(60000);
    }else
    if (propertyPrice > 10000 && propertyPrice <= 50000){//売買価格1億を超え5億以下の場合
      result = convertYenToManYen(100000);
    }else
    if (propertyPrice > 50000 && propertyPrice <100000){//売買価格5億を超え10億の場合
      result = convertYenToManYen(200000);
    }else
    if(propertyPrice > 100000 && propertyPrice < 500000){//売買価格10億を超え50億の場合
      result = convertYenToManYen(400000);
    }else
    if(propertyPrice > 500000){//売買価格50億を超える場合
      result = convertYenToManYen(600000);
    }
    setInshizei(result);
    return result;
  };

  const calcTourokumenkyozei = () => {
    if(!koteiShisanZeiHyoukaGaku || koteiShisanZeiHyoukaGaku < 0)return;
    const result = koteiShisanZeiHyoukaGaku*0.02;
    setTourokumenkyozei(result);
    return result;
  };

  const calcHudousanshutokuzei = () => {
    if(!koteiShisanZeiHyoukaGaku || koteiShisanZeiHyoukaGaku < 0)return;
    const result = koteiShisanZeiHyoukaGaku*0.04;
    setHudousansyutokuzei(result);
    return result;
  };

  const handleChangePropertyPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyPrice(Number(e.target.value));
  }

  const handleChangeKoteiShisanZeiHyoukaGaku = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKoteiShisanZeiHyoukaGaku(Number(e.target.value));
  };

  const handleCalcResults = () => {
    calcTyukai();
    calcInshizei();
    calcTourokumenkyozei();
    calcHudousanshutokuzei();
    setShowResults(true);
  };

  const calcRealRateOfReturn = () => {
    // 実質利回り = 実質家賃収入 / 実質購入費用 * 100
    // 実質購入費用 = 売買価格 + 諸費用
    if(propertyPrice === undefined || propertyPrice < 0)return;
    if(realRent === undefined || realRent < 0)return;

    console.log("realRent", realRent);
    setRealRateOfReturn(realRent / (propertyPrice + totalResult) * 100)
    return 
  };

  // 実質家賃収入を計算する関数
  const calcRealRent = () => { 
    if(monthlyRentIncome === undefined || monthlyRentIncome < 0)return;
    if(managementFee === undefined || managementFee < 0)return;
    if(fixedAssetTax === undefined || fixedAssetTax < 0)return;
    if(cityPlanningTax === undefined || cityPlanningTax < 0)return;

    const result = (monthlyRentIncome - managementFee)*12 - fixedAssetTax - cityPlanningTax;
    setRealRent(result);
    calcRealRateOfReturn();
  };

  console.log(monthlyRentIncome);
  console.log(managementFee);
  console.log(fixedAssetTax);
  console.log(cityPlanningTax);


  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-white text-black`}
    >
      {
        
        <>
        
          <div className="h-screen w-screen items-center flex flex-col justify-center">
            <h2 className=" font-bold text-2xl">物件購入諸費用シミュレーター</h2>
            <div className="mb-5 flex flex-col">
              <label htmlFor="">物件価格を入力してください。<span className="text-red-500">※必須</span></label>
              <div>
                <input type="text"  value={propertyPrice} placeholder="0" className="w-[300px] text-black border-2 rounded-2xl border-black px-5 py-1" onChange={(e) => handleChangePropertyPrice(e)}/>
                <span className="pl-1">万円</span>
              </div>
            </div>
            <div className="mb-5 flex flex-col">
              <label htmlFor="">固定資産税評価額を入力してください。<span className="text-red-500">※必須</span></label>
              <div>
                <input type="text"  value={koteiShisanZeiHyoukaGaku} placeholder="0" className="w-[300px] text-black border-2 rounded-2xl border-black px-5 py-1" onChange={(e) => handleChangeKoteiShisanZeiHyoukaGaku(e)}/>
                <span className="pl-1">万円</span>
              </div>
            </div>
            {/* <button onClick={() => handleCalcResults()} className="mb-20 bg-sky-400 text-white px-5 py-2 rounded-2xl w-[340px]">計算結果を表示する</button> */}
            <ButtonPrimary onClickFunc={handleCalcResults} label="計算結果を表示する"/>
            {
              propertyPrice && koteiShisanZeiHyoukaGaku && showResults && 
              <>
                <div className="flex flex-col items-center">
                  <div className="flex bg-red-200 w-[340px] justify-between items-center">
                    <p>仲介手数料</p>
                    <p className=" text-2xl">{tyukai}万円</p>
                  </div>
                  <div className="bg-blue-200 flex justify-between w-[340px] items-center">
                    <p>印紙税</p>
                    <p className="text-2xl">{inshizei}万円</p>
                  </div>
                  <div className="bg-green-200 flex w-[340px] justify-between items-center">
                    <p>司法書士報酬</p>
                    <p className="text-2xl">{SHIHOUSHOSHI_HOUSYU}万円(仮)</p>
                  </div>
                  <div className="bg-yellow-200 flex justify-between w-[340px] items-center">
                    <p>登録免許税</p>
                    <p className="text-2xl ">{tourokumenkyozei}万円</p>
                  </div>
                  <div className=" bg-emerald-200 flex justify-between w-[340px] items-center">
                    <p>不動産取得税</p>
                    <p className="text-2xl">{hudousansyutokuzei}万円</p>
                  </div>

                  <div className="text-center flex  mt-10  bg-red-300 ">
                    <div className="flex m-auto items-center">
                      <p className="font-semibold text-xl mr-5">諸費用合計:</p>
                      <p className="font-extrabold text-3xl">{totalResult}万円</p>
                    </div>
                  </div>
                  <div className="text-center flex  mt-10  bg-red-300 ">
                    <div className="flex flex-col m-auto items-center">
                      <p className="font-semibold text-xl mr-5">物件購入費用（売買価格 + 諸費用）合計:</p>
                      <p className="font-extrabold text-3xl">{totalResult + propertyPrice}万円</p>
                    </div>
                  </div>
                </div>
                <Link href="#rimawari" className="text-sky-400">↓↓↓　実質利回りも計算する　↓↓↓</Link>
              </>
            }
          </div>
          <div id="rimawari" className="h-screen w-screen" >
            <h2 className="">実質利回りシミュレーター</h2>
              {/* //入力項目 : 月額家賃収入(必須)、管理費、固定資産税(必須)、都市計画税(必須)*/}
            <div className="mb-5 flex flex-col">
              <label htmlFor="">月額家賃収入を入力してください。<span className="text-red-500">※必須</span></label>
              <div>
                <input type="text"  value={monthlyRentIncome} placeholder="0" className="w-[300px] text-black border-2 rounded-2xl border-black px-5 py-1" onChange={(e) => setMonthlyRentIncome(Number(e.target.value))}/>
                <span className="pl-1">万円</span>
              </div>
            
              <label htmlFor="">管理費を入力してください。</label>
              <div>
                <input type="text"  value={managementFee} placeholder="0" className="w-[300px] text-black border-2 rounded-2xl border-black px-5 py-1" onChange={(e) => setManagementFee(Number(e.target.value))}/>
                <span className="pl-1">万円</span>
              </div>
              <label htmlFor="">固定資産税を入力してください。<span className="text-red-500">※必須</span></label>
              <div>
                <input type="text"  value={fixedAssetTax} placeholder="0" className="w-[300px] text-black border-2 rounded-2xl border-black px-5 py-1" onChange={(e) => setFixedAssetTax(Number(e.target.value))}/>
                <span className="pl-1">万円</span>
              </div>
              <label htmlFor="">都市計画税を入力してください。<span className="text-red-500">※必須</span></label>
              <div>
                <input type="text"  value={cityPlanningTax} placeholder="0" className="w-[300px] text-black border-2 rounded-2xl border-black px-5 py-1" onChange={(e) => setCityPlanningTax(Number(e.target.value))}/>
                <span className="pl-1">万円</span>
              </div>
            </div>

            <ButtonPrimary onClickFunc={calcRealRent} label="計算結果を表示する"/>
            <div>
              <p>{realRent}万円/年間</p>
              <p>実質利回り：{realRateOfReturn}%</p>
            </div>
          </div>
        </>
      }
    </main>
  )
}
