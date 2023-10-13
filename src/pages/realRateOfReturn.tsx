import { ButtonPrimary } from "@/components/ButtonPrimary";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import ResultDisplayWrapper from "@/components/ResultDisplayWrapper";
import { StepBar } from "@/components/StepBar";
import StemNumber from "@/components/StepNumber";
import Title from "@/components/Title";
import { useCalc } from "@/hooks/useCalc";
import { useState } from "react";


const RealRateOfReturn = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { 
    propertyPrice, 
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
    managementFee,
    fixedAssetTax,
    cityPlanningTax,
    realRent,
    realRateOfReturn,
    setMonthlyRentIncome,
    setManagementFee,
    setFixedAssetTax,
    setCityPlanningTax,
    setRealRent,
    setRealRateOfReturn,
    calcRealRateOfReturn,
    calcRealRent,
    handleChangeInputValue,
  } = useCalc();

  const handleChangeCurrentStep = () => {
    setCurrentStep(prev => prev + 1);
    setShowResults(false);
  };

  console.log(propertyPrice);
  return (
    <div className="p-3">
      <Header/>
      <Title text="実質利回りをミエルカ"/>
      <StepBar currentStep={currentStep}/>
      {
        currentStep === 1 && 
        <>
          <h2 className="text-center mt-5">まずは物件を買うときの諸費用をミエルカしよう</h2>
    
          <Input value={propertyPrice} onChangeFunc={(e) => handleChangePropertyPrice(e)} label="物件価格"/>
          <Input value={koteiShisanZeiHyoukaGaku} onChangeFunc={(e) => handleChangeKoteiShisanZeiHyoukaGaku(e)} label="固定資産税評価額"/>
          <div className="w-full flex h-fit justify-center my-8">
            <ButtonPrimary label="計算結果を表示" onClickFunc={handleCalcOtherExpenses}/>
          </div>
    
          {
            showResults && 
            <>
              <ResultDisplayWrapper>
                <div className="flex justify-between mb-3">
                  <p>仲介手数料:</p>
                  <p>{tyukai}万円</p>
                </div>
                <div className="flex justify-between mb-3">
                  <p>印紙税:</p>
                  <p>{inshizei}万円</p>
                </div>
                <div className="flex justify-between mb-3">
                  <p>司法書士報酬:</p>
                  <p>{SHIHOUSHOSHI_HOUSYU}万円</p>
                </div>
                <div className="flex justify-between mb-3">
                  <p>登録免許税:</p>
                  <p>{tourokumenkyozei}万円</p>
                </div>
                <div className="flex justify-between">
                  <p>不動産取得税:</p>
                  <p>{hudousansyutokuzei}万円</p>
                </div>
              </ResultDisplayWrapper>
              <div className="flex flex-col items-center mt-10 w-[350px] m-auto">
                <div onClick={() => handleChangeCurrentStep()} className="cursor-pointer bg-primary text-white w-[80px] h-[80px] rounded-full text-[60px] flex justify-center items-center">
                  ▶︎
                </div>
                <div className="">次へ</div>
              </div>
            </>
          }
        </>
      }
      {
        currentStep === 2 &&
        <>
          <h2 className="text-center mt-5">実質的な家賃収入をミエルカしよう。これで実質利回りもわかるよ</h2>
          <Input label="月額家賃収入" value={monthlyRentIncome} onChangeFunc={(e) => handleChangeInputValue(e, setMonthlyRentIncome)}/>
          <Input label="管理費" value={managementFee} onChangeFunc={(e) => handleChangeInputValue(e, setManagementFee)}/>
          <Input label="固定資産税" value={fixedAssetTax} onChangeFunc={(e) => handleChangeInputValue(e, setFixedAssetTax)}/>
          <Input label="都市計画税" value={cityPlanningTax} onChangeFunc={(e) => handleChangeInputValue(e, setCityPlanningTax)}/>
          <div className="w-full flex h-fit justify-center my-8">
            <ButtonPrimary label="計算結果を表示" onClickFunc={calcRealRent}/>
          </div>
          {
            showResults &&
            <>
              <ResultDisplayWrapper>
                <div className="flex justify-between mb-3">
                  <p>実質家賃収入:</p>
                  <p>{realRent}万円</p>
                </div>
                <div className="flex justify-between mb-3">
                  <p>実質利回り:</p>
                  <p>{realRateOfReturn}%</p>
                </div>
              </ResultDisplayWrapper>
            </>
          }
        </>
      }
    </div>
  );
};

export default RealRateOfReturn;