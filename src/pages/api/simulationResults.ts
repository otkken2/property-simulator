import { GetSimulationResult } from "@/utils/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest, res: NextApiResponse){
  const session = await getSession({req});
  if(!session)return res.status(401).json({message: "セッションがありません"})
  if(!session.user)return res.status(401).json({message: "セッションにユーザー情報が含まれていません"})
  
  //セッションからメールアドレスを取得
  const userEmail = session.user.email;
  if(!userEmail)return res.status(401).json({message: "セッションにユーザーのメールアドレスが含まれていません"})

  if(req.method !== "GET"){
    return res.status(405).json({message: "Method not allowed"});
  }

  try{
    //メールアドレスに紐づいたシミュレーション結果レコードを全権取得
    const results = await prisma.simulationResult.findMany({
      where: {user_email: userEmail}
    });

    const convertedResults: GetSimulationResult[] = results.map(result => ({
      ...result,
      property_price: Number(result.property_price),
      property_tax_value: Number(result.property_tax_value),
      monthly_rent_income: Number(result.monthly_rent_income),
      monthly_management_fee: Number(result.monthly_management_fee),
      annual_property_tax: Number(result.annual_property_tax),
      urban_planning_tax: Number(result.urban_planning_tax),
      // 他のDecimal型のプロパティも同様に変換
    }));

    // return res.status(200).json({results});
    return res.status(200).json(convertedResults);
  } catch (error) {
    console.error("Error fetching simulation results:", error);
    return res.status(500).json({ error: "Failed to fetch simulation results." });
  }
};