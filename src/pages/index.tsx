import { useEffect, useState } from "react"


export default function Home() {
  const [propertyPrice, setPropertyPrice] = useState<number| undefined>();
  const [koteiShisanZeiHyoukaGaku, setKoteiShisanZeiHyoukaGaku] = useState<number | undefined>();
  const [showResults, setShowResults] = useState<boolean>(false);
  const [totalResult, setTotalResult] = useState<number>(0);

  const [tyukai, setTyukai] = useState(0);
  const [inshizei, setInshizei] = useState(0);
  const [tourokumenkyozei, setTourokumenkyozei] = useState(0);
  const [hudousansyutokuzei, setHudousansyutokuzei] = useState(0);
  const SHIHOUSHOSHI_HOUSYU = 100000;

  useEffect(()=>{
    setTotalResult(tyukai+inshizei+tourokumenkyozei+hudousansyutokuzei + SHIHOUSHOSHI_HOUSYU);
  },[hudousansyutokuzei, inshizei, tourokumenkyozei, tyukai]);

  // const formatNumberWithCommas = (number: number | undefined): string => {
  //   // カンマを削除
  //   const targetValue = number.toString();
  //   const numericString = targetValue.replace(/,/g, '');
  
  //   // 数値に変換
  //   const numberValue = parseFloat(numericString);
  
  //   // NaNの場合、元の入力を返す
  //   if (isNaN(numberValue)) return targetValue;
  
  //   // カンマを追加してフォーマット
  //   return numberValue.toLocaleString('en-US');
  // };

  const calcTyukai = (): number| null => {
    if(!propertyPrice || propertyPrice < 0)return null;
    const taxRate = 0.05;
    let zeinukiTesuryou: number = 0;
    let tax: number = 0;

    if(propertyPrice <= 2000000){
        zeinukiTesuryou = propertyPrice*0.05  //物件価格の5%
        tax = zeinukiTesuryou*taxRate; //消費税10%
    }else if(propertyPrice <= 4000000){
        zeinukiTesuryou = propertyPrice*0.04 + 20000  //物件価格の4%+2万円
        tax = zeinukiTesuryou*taxRate; //消費税10%
    }else if(propertyPrice > 4000000){
        zeinukiTesuryou = propertyPrice*0.03 + 60000 //物件価格の3%+6万円
        tax = zeinukiTesuryou*taxRate;
    }

    const result = zeinukiTesuryou+tax;
    setTyukai(result);
    return result;
  };




  const calcInshizei = () => {
    if(!propertyPrice || propertyPrice < 0)return null;

    let result: number = 0;
    if(propertyPrice >= 10000 && propertyPrice <= 100000){//1万円~10万以下の場合
      result = 200;
    }else 
    if (propertyPrice > 100000 && propertyPrice <= 500000){//10万〜50万以下の場合
      result = 400;
    }else 
    if (propertyPrice > 500000 && propertyPrice <= 1000000){//50万~100万以下の場合
      result = 1000;
    }else
    if (propertyPrice > 1000000 && propertyPrice <= 5000000){//売買価格100万〜500万以下の場合
      result = 2000;
    }else
    if (propertyPrice > 5000000 && propertyPrice <= 10000000){//売買価格500万〜1千万以下の場合
      result = 10000;
    }else
    if (propertyPrice > 10000000 && propertyPrice <= 50000000){//売買価格１千万~5千万以下の場合
      result = 20000;
    }else
    if (propertyPrice > 50000000 && propertyPrice <= 100000000){//売買価格5千万〜1億以下の場合
      result = 60000;
    }else
    if (propertyPrice > 100000000 && propertyPrice <= 500000000){//売買価格1億〜5億以下の場合
      result = 100000;
    }else
    if (propertyPrice > 500000000){
      result = 200000;
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


  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-white text-black p-5`}
    >
      <h1 className=" font-bold text-2xl">物件購入諸費用シミュレーター</h1>
      <div className="mb-5 flex flex-col">
        <label htmlFor="">物件価格を入力してください。</label>
        {/* <input type="text"  value={formatNumberWithCommas(propertyPrice)} placeholder="0" className="w-[300px] text-black border-2 rounded-2xl border-black px-5 py-1" onChange={(e) => handleChangePropertyPrice(e)}/> */}
        <input type="text"  value={propertyPrice} placeholder="0" className="w-[300px] text-black border-2 rounded-2xl border-black px-5 py-1" onChange={(e) => handleChangePropertyPrice(e)}/>
      </div>
      <div className="mb-5 flex flex-col">
        <label htmlFor="">固定資産税評価額を入力してください。</label>
        <input type="text"  value={koteiShisanZeiHyoukaGaku} placeholder="0" className="w-[300px] text-black border-2 rounded-2xl border-black px-5 py-1" onChange={(e) => handleChangeKoteiShisanZeiHyoukaGaku(e)}/>
      </div>
      <button onClick={() => handleCalcResults()} className="mb-20 bg-sky-400 text-white px-5 py-2 rounded-2xl w-[300px]">計算結果を表示する</button>
      {
        showResults && 
        <div>
          <div className="flex bg-red-200 w-[300px] justify-between items-center">
            <p>仲介手数料</p>
            <p className=" text-2xl">{tyukai}円</p>
          </div>
          <div className="bg-blue-300 flex justify-between w-[300px] items-center">
            <p>印紙税</p>
            <p className="text-2xl">{inshizei}円</p>
          </div>
          <div className="bg-green-300 flex w-[300px] justify-between items-center">
            <p>司法書士報酬</p>
            <p className="text-2xl">{SHIHOUSHOSHI_HOUSYU}円(仮)</p>
          </div>
          <div className="bg-yellow-300 flex justify-between w-[300px] items-center">
            <p>登録免許税</p>
            <p className="text-2xl ">{tourokumenkyozei}円</p>
          </div>
          <div className=" bg-emerald-300 flex justify-between w-[300px] items-center">
            <p>不動産取得税</p>
            <p className="text-2xl">{hudousansyutokuzei}円</p>
          </div>

          <div>
            <p>諸費用合計</p>
            <p>{totalResult}</p>
          </div>
        </div>
      }
    </main>
  )
}
