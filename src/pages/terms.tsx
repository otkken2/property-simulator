import Header from "@/components/Header";
import { termsList } from "@/utils/constants";
import { useState } from "react";

const Terms = () => {
  const [showingTerms, setShowingTerms] = useState<number[]>([]);

  const handleClickTerm = (index: number) => {
    if(showingTerms.includes(index)){
      setShowingTerms(showingTerms.filter(term => term !== index));
    }else{
      setShowingTerms([...showingTerms, index]);
    }
  };
  return (
    <div>
      <Header/>
      <h1 className="text-center text-3xl mb-10">用語集</h1>
      <div className="contentsWrapper flex flex-col w-fit m-auto">
        {
          termsList.map((term,index) => {
            return (
              <div key={index} className="flex flex-col items-center  mb-10 w-[800px] m-auto">
                <div 
                  className={`text-2xl w-full text-center cursor-pointer relative ${showingTerms.includes(index) ? "": "border-b"}`}
                  onClick={() => handleClickTerm(index)}
                >
                  {term.name}
                  <span className="absolute right-[20%]">{showingTerms.includes(index) ? "▲" : "▼" }</span>
                </div>
                {
                  showingTerms.includes(index) &&
                  <div className="text-sm bg-gray-200 p-6 rounded-3xl min-w-full">{term.description}</div>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Terms;