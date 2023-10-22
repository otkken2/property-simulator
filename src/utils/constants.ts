import TermsHudousansyutokuzei from "@/components/terms/TermsHudousansyutokuzei";
import TermsInshizei from "@/components/terms/TermsInshizei";
import TermsKanrihi from "@/components/terms/TermsKanrihi";
import TermsKoteishisanzei from "@/components/terms/TermsKoteishisanzei";
import TermsKoteishisanzeiHyoukagaku from "@/components/terms/TermsKoteishisanzeiHyoukagaku";
import TermsShihoushoshihoushu from "@/components/terms/TermsShihoushoshihoushu";
import TermsToshikeikakuzei from "@/components/terms/TermsTosikeikakuzei";
import TermsTourokumenkyozei from "@/components/terms/TermsTourokumenkyozei";
import TermsTyukaitesuryo from "@/components/terms/TermsTyukaitesuryo";

export interface Term {
  name: string;
  description: JSX.Element;
}

export const TERMS_KOTEISHISANZEIHYOUKAGAKU:Term = {
  name: "固定資産税評価額",
  description: TermsKoteishisanzeiHyoukagaku(),
};

export const TERMS_TYUKAITESURYO:Term = {
  name: "仲介手数料",
  description: TermsTyukaitesuryo(),
};

export const TERMS_INSHIZEI: Term = {
  name: "印紙税",
  description: TermsInshizei(),
};

export const TERMS_SHIHOSHOUSHIHOSHU: Term = {
  name: "司法書士報酬",
  description: TermsShihoushoshihoushu(),
};

export const TERMS_TOUROKUMENKYOZEI: Term = {
  name: "登録免許税",
  description: TermsTourokumenkyozei(),
};

export const TERMS_HUDOUSANSYUTOKUZEI: Term = {
  name: "不動産取得税",
  description: TermsHudousansyutokuzei(),
};

export const TERMS_KOTEISHISANZEI:Term = {
  name: "固定資産税",
  description: TermsKoteishisanzei(),
};

export const TERMS_TOSHIKEIKAKUZEI:Term = {
  name: "都市計画税",
  description: TermsToshikeikakuzei(),
};

export const TERMS_KANRIHI: Term = {
  name: "月額管理費",
  description: TermsKanrihi(),
};

export const termsList: Term[] = [
  TERMS_KOTEISHISANZEIHYOUKAGAKU,
  TERMS_TYUKAITESURYO,
  TERMS_INSHIZEI,
  TERMS_SHIHOSHOUSHIHOSHU,
  TERMS_TOUROKUMENKYOZEI,
  TERMS_HUDOUSANSYUTOKUZEI,
  TERMS_KOTEISHISANZEI,
  TERMS_TOSHIKEIKAKUZEI,
  TERMS_KANRIHI,
];