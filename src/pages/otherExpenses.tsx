import { ButtonPrimary } from "@/components/ButtonPrimary";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import ResultDisplayWrapper from "@/components/ResultDisplayWrapper";
import { useCalc } from "@/hooks/useCalc";

const OtherExpenses = () => {
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
  } = useCalc();
  return (
    <div className="p-3">
      <Header/>
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
        </>
      }
    </div>
  );
};

export default OtherExpenses;