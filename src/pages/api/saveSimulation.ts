import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export  default async function saveSimulation (req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST'){
    return res.status(405).json({message: 'Method not allowed'});
  }

  try {
    const {
      property_price,
      property_tax_value,
      monthly_rent_income,
      monthly_management_fee,
      annual_property_tax,
      urban_planning_tax,
      name
    } = req.body;

    const result = await prisma.simulationResult.create({
      data: {
        property_price,
        property_tax_value,
        monthly_rent_income,
        monthly_management_fee,
        annual_property_tax,
        urban_planning_tax,
        name,
      }
    });

    return res.status(200).json({result});
  } catch (error) {
    console.error("Error saving simulation result:", error);
    return res.status(500).json({ error: "Failed to save simulation result." });
  }
};