export interface GetSimulationResult {
  id: number,
  user_email: string,
  name: string,
  property_price: number,
  property_tax_value: number,
  monthly_rent_income: number,
  monthly_management_fee: number,
  annual_property_tax: number,
  urban_planning_tax: number,
  updated_at?: Date | null,
  created_at: Date,
};