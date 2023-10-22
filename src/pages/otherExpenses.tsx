import { ButtonPrimary } from "@/components/ButtonPrimary";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import ResultDisplayWrapper from "@/components/ResultDisplayWrapper";
import ResultItem from "@/components/ResultItem";
import { useCalc } from "@/hooks/useCalc";
import { TERMS_HUDOUSANSYUTOKUZEI, TERMS_INSHIZEI, TERMS_KOTEISHISANZEIHYOUKAGAKU, TERMS_SHIHOSHOUSHIHOSHU, TERMS_TOUROKUMENKYOZEI, TERMS_TYUKAITESURYO, Term } from "@/utils/constants";
import { useState } from "react";

const OtherExpenses = () => {
  const [ showInfo, setShowInfo ] = useState(false);
  const [ contentOfInfo, setContentOfInfo ] = useState<Term | undefined>();

  const handleShowInfo = (contentOfInfo: Term) => {
    setShowInfo(!showInfo);
    setContentOfInfo(contentOfInfo);
  }

  const {
    propertyPrice,
    handleChangePropertyPrice,
    koteiShisanZeiHyoukaGaku,
    handleChangeKoteiShisanZeiHyoukaGaku,
    handleCalcOtherExpenses,
    showResults,
    tyukai,
    inshizei,
    tourokumenkyozei,
    hudousansyutokuzei,
    SHIHOUSHOSHI_HOUSYU,
  } = useCalc();
  return (
    <div className="p-3 relative">
      <Header/>
      <h2 className="text-center mt-5">まずは物件を買うときの諸費用をミエルカしよう</h2>

      <Input value={propertyPrice} onChangeFunc={(e) => handleChangePropertyPrice(e)} label="物件価格"/>
      <Input value={koteiShisanZeiHyoukaGaku} onChangeFunc={(e) => handleChangeKoteiShisanZeiHyoukaGaku(e)} label="固定資産税評価額" isExistInfo={true} handleShowInfo={() => handleShowInfo(TERMS_KOTEISHISANZEIHYOUKAGAKU)}/>
      <div className="w-full flex h-fit justify-center my-8">
        <ButtonPrimary label="計算結果を表示" onClickFunc={handleCalcOtherExpenses}/>
      </div>

      {
        showResults && 
        <>
          <ResultDisplayWrapper>
            <ResultItem itemLabel="仲介手数料" itemValue={tyukai} handleClick={() => handleShowInfo(TERMS_TYUKAITESURYO)}/>
            <ResultItem itemLabel="印紙税" itemValue={inshizei} handleClick={() => handleShowInfo(TERMS_INSHIZEI)}/>
            <ResultItem itemLabel="司法書士報酬" itemValue={SHIHOUSHOSHI_HOUSYU} handleClick={() => handleShowInfo(TERMS_SHIHOSHOUSHIHOSHU)}/>
            <ResultItem itemLabel="登録免許税" itemValue={tourokumenkyozei} handleClick={() => handleShowInfo(TERMS_TOUROKUMENKYOZEI)}/>
            <ResultItem itemLabel="不動産取得税" itemValue={hudousansyutokuzei} handleClick={() => handleShowInfo(TERMS_HUDOUSANSYUTOKUZEI)}/>
          </ResultDisplayWrapper>
        </>
      }
      {showInfo && (
          <div 
            className="fixed top-0 left-0 w-screen h-screen text-white bg-black opacity-90 flex justify-center items-center px-3 leading-8"
            onClick={() => setShowInfo(false)}
          >
            <div className="max-w-[800px] h-fit">
              <p className="text-center font-bold text-3xl">{contentOfInfo?.name}</p>
              <p className="text-center mt-5">{contentOfInfo?.description}</p>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default OtherExpenses;