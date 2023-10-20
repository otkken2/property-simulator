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
      <h1>Terms</h1>
      <div className="contentsWrapper flex flex-col">
        {
          termsList.map((term,index) => {
            return (
              <div key={index} className="flex flex-col items-center mb-5">
                <div 
                  className="text-2xl"
                  onClick={() => handleClickTerm(index)}
                >
                  {term.name}
                </div>
                {
                  showingTerms.includes(index) &&
                  <div className="text-sm">{term.description}</div>
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