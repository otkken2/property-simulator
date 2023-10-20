import TermsHudousansyutokuzei from "@/components/terms/TermsHudousansyutokuzei";
import TermsInshizei from "@/components/terms/TermsInshizei";
import TermsKanrihi from "@/components/terms/TermsKanrihi";
import TermsKoteishisanzei from "@/components/terms/TermsKoteishisanzei";
import TermsKoteishisanzeiHyoukagaku from "@/components/terms/TermsKoteishisanzeiHyoukagaku";
import TermsToshikeikakuzei from "@/components/terms/TermsTosikeikakuzei";
import TermsTourokumenkyozei from "@/components/terms/TermsTourokumenkyozei";
import TermsTyukaitesuryo from "@/components/terms/TermsTyukaitesuryo";

export const termsList: {name: string, description: JSX.Element}[] = [
  {
    name: "固定資産税評価額",
    description: TermsKoteishisanzeiHyoukagaku(),
  },
  {
    name: "仲介手数料",
    description: TermsTyukaitesuryo(),
  },
  {
    name: "印紙税",
    description: TermsInshizei(),
  },
  {
    name:"司法書士報酬",
    description: "司法書士報酬とは、司法書士に支払う報酬です。",
  },
  {
    name:"登録免許税",
    description: TermsTourokumenkyozei(),
  },
  {
    name: "不動産取得税",
    description: TermsHudousansyutokuzei(),
  },
  {
    name: "固定資産税",
    description: TermsKoteishisanzei(),
  },
  {
    name: "都市計画税",
    description: TermsToshikeikakuzei(),
  },
  {
    name: "月額管理費",
    description: TermsKanrihi(),
  }
];