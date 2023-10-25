import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest, res: NextApiResponse){
  const {userId} = req.query;

  if(req.method !== "GET"){
    return res.status(405).json({message: "Method not allowed"});
  }

  if(userId === undefined){
    return res.status(400).json({message: "User ID is required"});
  }

  try{
    const results = await prisma.simulationResult.findMany({
      where: {
        user_id: parseInt(userId[0], 10)
      }
    });

    // return res.status(200).json({results});
    return res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching simulation results:", error);
    return res.status(500).json({ error: "Failed to fetch simulation results." });
  }
};