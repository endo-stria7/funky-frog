/* eslint-disable tsdoc/syntax -- sql syntax confict*/
// https://supabase.com/docs/reference/javascript/rpc
// https://supabase.com/docs/guides/database/functions

import { createClient } from '@supabase/supabase-js';
import { type Database } from '@/types/supabase';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
/**
 * 32. Create a report that shows the average UnitPrice rounded to the next whole number, total price of UnitsInStock and
 * maximum number of orders from the products table. All saved as AveragePrice, TotalStock and MaxOrder respectively.
 *
 * SELECT round (avg (UnitPrice)) AS AveragePrice,
 * SUM(UnitsInStock) AS TotalStock,
 * max(UnitsOnOrder) as MaxOrder,
 * FROM products
 */
export async function calculateProductStats(): Promise<{
  [Key in 'averagePrice' | 'totalStock' | 'maxOrder']: number;
}> {
  const { data, error } = await supabase.rpc('calculate_product_stats');
  if (error) {
    throw new Error(error.message);
  }
  const result = data[0];
  return {
    averagePrice: result!.f1,
    totalStock: result!.f2,
    maxOrder: result!.f3,
  };
}

/**
 * 34. Create a report that showsthe customer_id,sum of freight, from the orderstable with sum of freight greater $200, grouped
 * by customer_id
 * SELECT customer_id,sum(freight)
 * FROM orders
 * GROUP BY customer_id
 * HAVING sum(freight) > 200;
 */
export async function customerFreightTotal(): Promise<object> {
  const { data, error } = await supabase.rpc('customer_freight_total');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * 13. Create a report that shows the City, CompanyName, ContactName of customers from cities starting with A or B.
 * SELECT
 *   city,
 *   company_name,
 *   contact_name
 * FROM
 *   customers
 * WHERE
 *   city LIKE 'A%'
 *   OR city LIKE 'B%';
 */
export async function filterCustomersByCity(): Promise<object | Error> {
  const { data, error } = await supabase.rpc('filter_customers_by_city');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * 36. Create a report that showsthe EMPLOYEE_ID, the LAST_NAME and FIRST_NAME as employee, and the LAST_NAME and FIRST_NAME of
 * who they report to as manager from the employees table sorted by Employee
 * SELECT
 * 	A.EMPLOYEE_ID,
 * 	CONCAT(A.LAST_NAME, ' ', A.FIRST_NAME) AS EMPLOYEE,
 * 	CONCAT(B.LAST_NAME, ' ', B.FIRST_NAME) AS MANAGER
 * FROM
 * 	EMPLOYEES A
 * 	LEFT JOIN EMPLOYEES B ON B.EMPLOYEE_ID = A.REPORTS_TO
 * ORDER BY
 * 	A.EMPLOYEE_ID;
 */
export async function getEmployeeManager(): Promise<object | Error> {
  const { data, error } = await supabase.rpc('get_employee_manager');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/**
 * Sales Analysis:
 * /////////////////////////////////////////////////////////
 *
 * “Which products generate the most revenue?”
 * SELECT
 * 	P.PRODUCT_ID,
 * 	P.PRODUCT_NAME,
 * 	(
 * 		SUM(
 * 			OD.UNIT_PRICE * OD.QUANTITY * (1 - OD.DISCOUNT) - O.FREIGHT
 * 		) / NULLIF(
 * 			SUM(OD.UNIT_PRICE * OD.QUANTITY * (1 - OD.DISCOUNT)),
 * 			0
 * 		)
 * 	) * 100 AS PROFIT_MARGIN,
 * 	RANK() OVER (
 * 		ORDER BY
 * 			(
 * 				SUM(
 * 					OD.UNIT_PRICE * OD.QUANTITY * (1 - OD.DISCOUNT) - O.FREIGHT
 * 				) / NULLIF(
 * 					SUM(OD.UNIT_PRICE * OD.QUANTITY * (1 - OD.DISCOUNT)),
 * 					0
 * 				)
 * 			) * 100 DESC
 * 	) AS PROFIT_MARGIN_RANK
 * FROM
 * 	PRODUCTS AS P
 * 	INNER JOIN ORDER_DETAILS AS OD ON P.PRODUCT_ID = OD.PRODUCT_ID
 * 	INNER JOIN ORDERS AS O ON OD.ORDER_ID = O.ORDER_ID
 * GROUP BY
 * 	P.PRODUCT_ID,
 * 	P.PRODUCT_NAME
 * ORDER BY
 * 	PROFIT_MARGIN_RANK ASC;
 */
export async function getProductProfitMarginAnalysis(): Promise<
  object | Error
> {
  const { data, error } = await supabase.rpc('product_profit_margin_analysis');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
/**
 * “What are the peak sales months?”
 * SELECT
 * 	TO_CHAR(TO_DATE(EXTRACT(
 * 		MONTH
 * 		FROM
 * 			O.ORDER_DATE
 * 	)::text,'MM'),'Month') AS SALES_MONTH,
 * 	SUM(OD.UNIT_PRICE * OD.QUANTITY * (1 - OD.DISCOUNT)) AS TOTAL_SALES
 * FROM
 * 	ORDERS O
 * 	INNER JOIN ORDER_DETAILS OD ON O.ORDER_ID = OD.ORDER_ID
 * GROUP BY
 * 	SALES_MONTH
 * ORDER BY
 * 	TOTAL_SALES DESC;
 *
 */
export async function getMonthlyTotalSales(): Promise<object | Error> {
  const { data, error } = await supabase.rpc('monthly_total_sales');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
/**
 * “Which sales representatives perform exceptionally?”
 * SELECT
 *     OD.PRODUCT_ID,
 *     MAX(OD.UNIT_PRICE * OD.QUANTITY * (1 - OD.DISCOUNT)) AS MAX_TOTAL_SALES,
 *     RANK() OVER (ORDER BY MAX(OD.UNIT_PRICE * OD.QUANTITY * (1 - OD.DISCOUNT)) DESC) AS PRODUCT_RANK
 * FROM
 *     ORDER_DETAILS AS OD
 * GROUP BY
 *     OD.PRODUCT_ID
 * ORDER BY
 *     MAX_TOTAL_SALES DESC;
 */
export async function getProductSalesRanking(): Promise<object | Error> {
  const { data, error } = await supabase.rpc('product_sales_ranking');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
