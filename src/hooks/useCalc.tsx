import { SetStateAction, useState } from "react";

export const useCalc = () => {
  // 入力項目群１：物件価格、固定資産税評価額
  const [propertyPrice, setPropertyPrice] = useState<number | undefined>(0);
  const [koteiShisanZeiHyoukaGaku, setKoteiShisanZeiHyoukaGaku] = useState<number | undefined>(0);

  const [showResults, setShowResults] = useState<boolean>(false);
  const [totalOfOtherExpenses, setTotalOfOtherExpenses] = useState<number>(0);
  
  // 諸費用(計算結果)
  const [tyukai, setTyukai] = useState(0);
  const [inshizei, setInshizei] = useState(0);
  const [tourokumenkyozei, setTourokumenkyozei] = useState(0);
  const [hudousansyutokuzei, setHudousansyutokuzei] = useState(0);
  const SHIHOUSHOSHI_HOUSYU = 12;

  //入力項目 : 月額家賃収入(必須)、管理費、固定資産税(必須)、都市計画税(必須)
  const [monthlyRentIncome, setMonthlyRentIncome] = useState<number | undefined>();
  const [managementFee, setManagementFee] = useState<number | undefined>();
  const [fixedAssetTax, setFixedAssetTax] = useState<number | undefined>();
  const [cityPlanningTax, setCityPlanningTax] = useState<number | undefined>();
  const [realRent, setRealRent] = useState<number | undefined>();

  // 実質利回り
  const [realRateOfReturn, setRealRateOfReturn] = useState<number | undefined>();

  const numericRegex = /^[0-9\b]*$/;

  const handleChangePropertyPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    // e.target.valueが数値または空の場合以外、return
    if (!numericRegex.test(e.target.value)) return;

    // e.target.valueが空の場合、undefinedをセットしてリターン
    if (e.target.value === "") {
      setPropertyPrice(undefined);
      return;
    }

    setPropertyPrice(Number(e.target.value));
  };

  const handleChangeKoteiShisanZeiHyoukaGaku = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!numericRegex.test(e.target.value)) return;

    // e.target.valueが空の場合、undefinedをセットしてリターン
    if (e.target.value === "") {
      setKoteiShisanZeiHyoukaGaku(undefined);
      return;
    }

    setKoteiShisanZeiHyoukaGaku(Number(e.target.value));
  };

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>,setState: (value: SetStateAction<number | undefined>) => void) => {
  
    // e.target.valueが数値または空の場合以外、return
    if (!numericRegex.test(e.target.value)) return;

    // e.target.valueが空の場合、undefinedをセットしてリターン
    if (e.target.value === "") {
      setState(undefined);
      return;
    }

    setState(Number(e.target.value));
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

  const convertYenToManYen = (yen: number): number => {
    return yen/10000;
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

  const handleCalcOtherExpenses = () => {
    console.log("諸費用計算開始")
    calcTyukai();
    calcInshizei();
    calcTourokumenkyozei();
    calcHudousanshutokuzei();
    setShowResults(true);
    console.log("仲介手数料",tyukai);
    console.log("印紙税",inshizei);
    console.log("登録免許税",tourokumenkyozei);
    console.log("不動産取得税",hudousansyutokuzei);
    console.log("司法書士報酬",SHIHOUSHOSHI_HOUSYU);
  };

  console.log("仲介手数料",tyukai);
    console.log("印紙税",inshizei);
    console.log("登録免許税",tourokumenkyozei);
    console.log("不動産取得税",hudousansyutokuzei);
    console.log("司法書士報酬",SHIHOUSHOSHI_HOUSYU);

  const calcRealRateOfReturn = () => {
    // 実質利回り = 実質家賃収入 / 実質購入費用 * 100
    // 実質購入費用 = 売買価格 + 諸費用
    if(propertyPrice === undefined || propertyPrice < 0)return;
    if(realRent === undefined || realRent < 0)return;

    const totalOfOtherExpenses = tyukai + inshizei + tourokumenkyozei + hudousansyutokuzei + SHIHOUSHOSHI_HOUSYU
    console.log("購入諸費用",totalOfOtherExpenses);
    console.log("realRent", realRent);

    const realRateOfReturn = realRent / (propertyPrice + totalOfOtherExpenses) * 100
    setShowResults(true);
    setRealRateOfReturn(Math.floor((realRateOfReturn*100))/100);
    return 
  };

  const calcRealRent = () => { 
    console.log("HOGE")
    if(monthlyRentIncome === undefined || monthlyRentIncome < 0)return;
    if(managementFee === undefined || managementFee < 0)return;
    if(fixedAssetTax === undefined || fixedAssetTax < 0)return;
    if(cityPlanningTax === undefined || cityPlanningTax < 0)return;

    const result = (monthlyRentIncome - managementFee)*12 - fixedAssetTax - cityPlanningTax;
    setRealRent(result);
    calcRealRateOfReturn();
  };

  return {
    propertyPrice,
    setPropertyPrice,
    handleChangePropertyPrice,
    koteiShisanZeiHyoukaGaku,
    handleChangeKoteiShisanZeiHyoukaGaku,
    handleCalcOtherExpenses,
    showResults,
    setShowResults,
    tyukai,
    inshizei,
    tourokumenkyozei,
    hudousansyutokuzei,
    SHIHOUSHOSHI_HOUSYU,
    monthlyRentIncome,
    calcRealRateOfReturn,
    calcRealRent,
    setMonthlyRentIncome,
    managementFee,
    setManagementFee,
    fixedAssetTax,
    setFixedAssetTax,
    cityPlanningTax,
    setCityPlanningTax,
    realRent,
    setRealRent,
    realRateOfReturn,
    setRealRateOfReturn,
    handleChangeInputValue,

  };
};