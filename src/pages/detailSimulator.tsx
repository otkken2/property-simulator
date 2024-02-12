import { useCalc } from "@/hooks/useCalc";
import { useState } from "react";

interface StructureCharacteristics{
  RE_PROCUREMENT_PRICE: number,
  DURABLE_YEARS: number,
};

interface PropertyTypes{
    LIGHT_STEEL_FRAME: StructureCharacteristics,
    WOODEN: StructureCharacteristics,
    STEEL_FRAME: StructureCharacteristics,
    R_C: StructureCharacteristics
};

const LIGHT_STEEL_FRAME: StructureCharacteristics = {
  RE_PROCUREMENT_PRICE: 13,
  DURABLE_YEARS: 19,
};

const WOODEN: StructureCharacteristics = {
  RE_PROCUREMENT_PRICE: 13,
  DURABLE_YEARS: 22,
};

const STEEL_FRAME: StructureCharacteristics = {
  RE_PROCUREMENT_PRICE:18,
  DURABLE_YEARS: 34,
}

const R_C: StructureCharacteristics = {
  RE_PROCUREMENT_PRICE: 20,
  DURABLE_YEARS: 47,
}

const propertyTypes = [
  LIGHT_STEEL_FRAME,  
  WOODEN,
  STEEL_FRAME,
  R_C,
];

const DetailSimulator = () => {
  const {convertYenToManYen} = useCalc();
  const [propertyYearsOld, setPropertyYearsOld] = useState<number>(0);

  //物件価格と築年数、建物構造から、[簡易的に建物の価格]を求める（減価償却費の算出根拠になる）
  const buildingPrice = (propertyPrice: number, propertyYearsOld: number, propertyType: StructureCharacteristics, buildingArea: number): number => {
    // if(isWithinDurableYears){// 築年数が法定耐用年数内の物件の場合
    if(propertyYearsOld <= propertyType.DURABLE_YEARS){// 築年数が法定耐用年数内の物件の場合
      // console.log('築年数が法定耐用年数内の物件の場合')
      //建物価格 ＝ 建物の構造毎の再調達価格 × 建物面積 × ｛建物の構造毎の法定耐用年数 - 築年数 + （築年数 × 20%）｝ ÷ 建物の構造毎の法定耐用年数
      const result =  propertyType.RE_PROCUREMENT_PRICE* 10000 * buildingArea * (propertyType.DURABLE_YEARS - propertyYearsOld + (propertyYearsOld * 0.2)) / propertyType.DURABLE_YEARS
      // console.log("建物の構造毎の再調達価格 × 建物面積",propertyType.RE_PROCUREMENT_PRICE* 10000 * buildingArea)
      // return Math.round(result);
      return Math.round(convertYenToManYen(result));
    }else{ // 築年数が法定耐用年数外の物件の場合
      // console.log('築年数が法定耐用年数外の物件の場合')
      //建物価格 ＝ 建物の構造毎の再調達価格 × 建物面積 × (建物の構造ごとの法定耐用年数 × 20% ÷ 建物の構造毎の法定耐用年数)
      const result = propertyType.RE_PROCUREMENT_PRICE * 10000 * buildingArea * ((propertyType.DURABLE_YEARS * 0.2) / propertyType.DURABLE_YEARS)
      // console.log("建物の構造毎の再調達価格 × 建物面積",propertyType.RE_PROCUREMENT_PRICE * 10000 * buildingArea)
      // console.log("(建物の構造ごとの法定耐用年数 × 20% ÷ 建物の構造毎の法定耐用年数)",(propertyType.DURABLE_YEARS * 0.2) / propertyType.DURABLE_YEARS);
      // return Math.round(result);
      return Math.round(convertYenToManYen(result))
    };
  };


  console.log(buildingPrice(600, 35, R_C, 14.22));//建物価格

  //減価償却費の算出
  const annualDepreciation = (buildingPrice: number, propertyYearsOld: number, propertyType: StructureCharacteristics): number => {
    if(propertyYearsOld <=propertyType.DURABLE_YEARS){//築年数が法定耐用年数内の物件の場合
      const realDurableYears = propertyType.DURABLE_YEARS - propertyYearsOld + (propertyYearsOld * 0.2);
      return Math.round(buildingPrice / realDurableYears);
    }else{
      const realDurableYears = propertyType.DURABLE_YEARS * 0.2;
      return Math.round(buildingPrice / realDurableYears);
    };
  }

  console.log("減価償却費",annualDepreciation(115, 35, R_C));//減価償却費

  //年間のローン返済額を算出 ※単位：引数のお金の単位は円(返り値は万円に変換)
  function calculateAnnualRepayment(loanAmount: number, annualRate: number, years: number): number {
    const monthlyInterestRate = annualRate / 12 / 100; // 月あたりの金利
    const numberOfPayments = years * 12; // 総支払い回数
  
    // 月々の返済額を計算
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    console.log(`月々の返済額は ${monthlyPayment} 円です。`)
  
    // 年間の返済額を計算
    const annualPayment = monthlyPayment * 12;
  
    // 四捨五入して整数で返す
    return Math.round(convertYenToManYen(annualPayment));
  };

  const principalAmount = 5820000; // 借入額: 582万円
  const interestRate = 1.5;         // 年利: 1.5%
  const loanPeriodYears = 35;     // ローン期間: 35年

  const annualRepayment = calculateAnnualRepayment(principalAmount, interestRate, loanPeriodYears);
  console.log(`年間の返済額は ${annualRepayment}万円です。`);

  // 購入時諸費用 ＝ 物件価格 × 7% ※単位：万円
  const purchaseCost = (propertyPrice: number): number => {
    console.log("テスト",propertyPrice * 0.07);
    return Math.round(propertyPrice * 0.07);
  };

  console.log("購入時諸費用",purchaseCost(600));//購入時諸費用

  //借入額(＝ 物件価格 ＋ 購入時諸費用 － 自己資金)　※単位：万円
  const loanAmount = (propertyPrice: number, purchaseCost: number, ownMoney: number): number => {
    const result = propertyPrice + purchaseCost - ownMoney;
    return Math.round(result);
  }
  console.log("借入額",loanAmount(600, 42, 60));//借入額

  //固定資産税を簡易的に算出する(MEMO: 詳しく計算したい場合は、本アプリのメイン機能を流用できるようにするか？)
  //物件価格 × 70% × 1.4%(あくまで目安)
  const fixedAssetTax = (propertyPrice: number): number => {
    return Math.round(propertyPrice * 0.7 * 0.014);
  };

  console.log("固定資産税",fixedAssetTax(600));//固定資産税

  //都市計画税を簡易的に算出する(MEMO: 詳しく計算したい場合は、本アプリのメイン機能を流用できるようにするか？)
  //物件価格 × 70% × 0.3%(あくまで目安)
  const cityPlanningTax = (propertyPrice: number): number => {
    return Math.round(propertyPrice * 0.7 * 0.003);
  };

  console.log("都市計画税",cityPlanningTax(600));//都市計画税

  //実質年間収入(｛想定年間収入 － 想定年間収入 ×（家賃下落率 × 経過年数）｝× 入居率)
  const realAnnualIncome = (annualIncome: number, annualIncomeDeclineRate: number, years: number, occupancyRate: number): number => {
    const result = (annualIncome - annualIncome * (annualIncomeDeclineRate * years)) * occupancyRate;
    //小数点第一位で四捨五入
    return Math.round(result * 10) / 10;
  };

  console.log("実質年間収入(1年目)",realAnnualIncome(66, 0.001, 1, 0.95));//実質年間収入
  console.log("実質年間収入(2年目)",realAnnualIncome(66, 0.001, 2, 0.95));//実質年間収入

  //所得税率30%で税金を算出する(想定年間収入-経費)×30%
  //ここでいう経費とは、管理費、修繕費、金利、減価償却費のことであると推測する。
  const incomeTax = (annualIncome: number, expenditure: number): number => {
    const result = (annualIncome - expenditure) * 0.3;
    return Math.round(result * 10) / 10;
  };

  //支出(年間経費 ＋ 所得税等(法人税等) ＋ 大規模修繕費 ＋ ローン返済額)
  const expenditure = (annualExpenses: number, incomeTax: number, largeScaleRepairCost: number, annualRepayment: number): number => {
    const result = annualExpenses + incomeTax + largeScaleRepairCost + annualRepayment;
    return Math.round(result * 10) / 10;
  };

  console.log("支出(1年目)",expenditure(9, 0, 0, 21));//支出
  console.log(
    "支出(2年目以降)",
    expenditure(
      9,
      incomeTax(
        realAnnualIncome(66,0.001,2,0.95),
        2 + 6        
      ),
      0,
      21
    )
    );//支出




  return(
    <div>
      楽待シミュレーター
    </div>
  );
};
export default DetailSimulator;