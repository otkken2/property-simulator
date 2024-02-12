import Link from "next/link";
import { useEffect, useState } from "react"
import { ButtonPrimary } from "../components/ButtonPrimary";
import Header from "../components/Header";
import ButtonWithBorder from "@/components/ButtonWithBorder";
import Title from "@/components/Title";

export default function Home() {

  return (
    <main
      className={``}
    >
      <Header/>
      <Title text="何をミエルカしますか？"/>
      <div className="flex flex-col h-[300px] justify-around items-center">
        <Link href="/otherExpenses">
          <ButtonWithBorder text="購入時の諸費用をミエルカ" />
        </Link>

        <Link href="/realRateOfReturn">
          <ButtonWithBorder text="実質利回りをミエルカ" />
        </Link>

        <Link href={"/terms"}>
          <ButtonWithBorder text="用語集" />
        </Link>
      </div>
      {/* <iframe
          sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" 
          style={{ width: '120px', height: '240px' ,margin: 'auto'}} 
          // marginWidth="0" 
          // marginHeight="0" 
          // scrolling="no" 
          // frameBorder="0" 
          src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=kaitekinak056-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4815611475&linkId=10f024b4f275a0f6dd2f3857e60af918"
        >
        </iframe> */}
    </main>
  )
}
