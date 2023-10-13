import Link from "next/link";
import { useEffect, useState } from "react"
import { ButtonPrimary } from "../components/ButtonPrimary";
import Header from "../components/Header";
import ButtonWithBorder from "@/components/ButtonWithBorder";
import Title from "@/components/Title";

export default function Home() {

  return (
    <main
      className={` `}
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
      </div>
    </main>
  )
}
