// Ref: https://supabase.com/dashboard/project/<project-id>/api

import {
  QueryResult as _QueryResult,
  type QueryData,
  QueryError as _QueryError,
  createClient,
} from '@supabase/supabase-js';
import { type Database } from '@/types/supabase';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
/**
 * 33. Create a report that shows the supplier_id, company_name, category_name, product_name and unit_price from the products,
 * suppliers and categories table.
 * SELECT s.supplier_id,s.company_name, c.category_name, p.product_name, p.unit_price
 * FROM products p
 * JOIN suppliers s
 * ON s.supplier_id = p.supplier_id
 * JOIN categories C
 * On c.category_id = p.category_id;
 */

const getSupplierCategoryProductQuery = (
  limit = 10,
  range = { from: 0, to: 9 },
) =>
  supabase
    .from('products')
    .select(
      `product_name, unit_price, discontinued,
      categories(category_name),
      suppliers(supplier_id,company_name)`,
      { count: 'exact' },
    )
    .range(range.from, range.to)
    .limit(limit);
export async function getProductWithSupplierAndCategory(
  limit?: number,
  range?: {
    from: number;
    to: number;
  },
) {
  const { data, count, error } = await getSupplierCategoryProductQuery(
    limit,
    range,
  );
  if (error) throw new Error(error.message);
  return { data, count };
}

/**
 * 38. Create a view named CustomerInfo that shows the CustomerID, CompanyName, ContactName, ContactTitle, Address, City,
 * Country, Phone, OrderDate, RequiredDate, ShippedDate from the customers and orders table. HINT: Create a View.
 * CREATE VIEW CUSTOMER_INFO AS
 * SELECT
 *     C.CUSTOMER_ID,
 *     C.COMPANY_NAME,
 *     C.CONTACT_NAME,
 *     C.CONTACT_TITLE,
 *     C.ADDRESS,
 *     C.CITY,
 *     C.COUNTRY,
 *     C.PHONE,
 *     O.ORDER_DATE,
 *     O.REQUIRED_DATE,
 *     O.SHIPPED_DATE
 * FROM
 *     CUSTOMERS C
 *     JOIN ORDERS O ON C.CUSTOMER_ID = O.CUSTOMER_ID;
 *
 * SELECT * FROM public.customer_info;
 */
const viewCustomerInformationQuery = supabase.from('customer_info').select('*');
type ViewCustomerInformationData = QueryData<
  typeof viewCustomerInformationQuery
>;
export async function viewCustomerInformation() {
  const { data, error } = await viewCustomerInformationQuery;
  if (error) throw new Error(error.message);
  const viewCustomerInformationData: ViewCustomerInformationData = data;
  return viewCustomerInformationData;
}

/**
 * 40. Create a view named ProductDetails that shows the ProductID, CompanyName, ProductName, CategoryName, Description,
 * QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued from the supplier, products and
 * categories tables.
 * CREATE VIEW PRODUCT_DETAILS AS
 * SELECT
 * 	C.CATEGORY_NAME,
 * 	C.DESCRIPTION,
 * 	P.DISCONTINUED,
 * 	P.PRODUCT_ID,
 * 	P.PRODUCT_NAME,
 * 	P.QUANTITY_PER_UNIT,
 * 	P.REORDER_LEVEL,
 * 	P.UNIT_PRICE,
 * 	P.UNITS_IN_STOCK,
 * 	P.UNITS_ON_ORDER,
 * 	S.COMPANY_NAME
 * FROM
 * 	SUPPLIERS S
 * 	JOIN PRODUCTS P ON S.SUPPLIER_ID = P.SUPPLIER_ID
 * 	JOIN CATEGORIES C ON C.CATEGORY_ID = P.CATEGORY_ID;
 *
 * Select * from public.PRODUCT_DETAILS LIMIT 10
 */
const viewProductDetailsQuery = supabase.from('product_details').select('*');
type ViewProductDetailsData = QueryData<typeof viewProductDetailsQuery>;
export async function viewProductDetails() {
  const { data, error } = await viewProductDetailsQuery;
  if (error) throw new Error(error.message);
  const viewProductDetailsData: ViewProductDetailsData = data;
  return viewProductDetailsData;
}

/**
 * View to show recent sales by customer, including customer ID, name, order date, and total sales
 * SELECT
 *   O.*,
 *   C.CONTACT_NAME AS CUSTOMER_NAME,
 *   SUM(OD.UNIT_PRICE * OD.QUANTITY * (1 - OD.DISCOUNT)) AS TOTAL_SALES
 * FROM
 *   ORDERS AS O
 *   INNER JOIN CUSTOMERS AS C ON O.CUSTOMER_ID = C.CUSTOMER_ID
 *   INNER JOIN ORDER_DETAILS AS OD ON O.ORDER_ID = OD.ORDER_ID
 * GROUP BY
 *   O.ORDER_ID,
 *   O.CUSTOMER_ID,
 *   C.CONTACT_NAME,
 *   O.ORDER_DATE
 * ORDER BY
 *   O.ORDER_DATE DESC;
 */
const viewCustomerRecentSalesQuery = supabase
  .from('recent_sales_by_customer')
  .select('*')
  .limit(10);
type ViewCustomerRecentSalesData = QueryData<
  typeof viewCustomerRecentSalesQuery
>;
export async function viewCustomerRecentSales() {
  const { data, error } = await viewCustomerRecentSalesQuery;
  if (error) throw new Error(error.message);
  const viewCustomerRecentSalesData: ViewCustomerRecentSalesData = data;
  return viewCustomerRecentSalesData;
}
/**
 * View to track recent sales made by employees, including employee ID, full name, order date, and total sales amount
 * SELECT
 *   E.*,
 *   CONCAT(E.LAST_NAME, ' ', E.FIRST_NAME) AS FULL_NAME,
 *   ORDER_DATE,
 *   SUM(OD.UNIT_PRICE * OD.QUANTITY * (1 - OD.DISCOUNT)) AS TOTAL_SALES
 * FROM
 *   EMPLOYEES AS E
 *   INNER JOIN ORDERS AS O ON E.EMPLOYEE_ID = O.EMPLOYEE_ID
 *   INNER JOIN ORDER_DETAILS AS OD ON O.ORDER_ID = OD.ORDER_ID
 * GROUP BY
 *   E.EMPLOYEE_ID,
 *   FULL_NAME,
 *   ORDER_DATE
 * ORDER BY
 *   ORDER_DATE DESC;
 */
const viewEmployeeRecentSalesQuery = supabase
  .from('recent_sales_by_employee')
  .select('*')
  .limit(7);
type ViewEmployeeRecentSalesData = QueryData<
  typeof viewEmployeeRecentSalesQuery
>;
export async function viewEmployeeRecentSales() {
  const { data, error } = await viewEmployeeRecentSalesQuery;
  if (error) throw new Error(error.message);
  const viewEmployeeRecentSalesData: ViewEmployeeRecentSalesData = data;
  return viewEmployeeRecentSalesData;
}

/**
 * View to calculate total revenue, total profit, profit margin, and profit margin rank for each product
 */
export async function viewProductWithProfitRank(range?: {
  from?: number;
  to?: number;
}) {
  if (range?.from && range.to) {
    const { data: productProfitRankData, error } = await supabase
      .from('product_revenue_and_profit_rank')
      .select('*')
      .range(range.from ?? 0, range.to ?? 9);

    if (error) throw new Error(error.message);

    return productProfitRankData;
  }
  const { data: productProfitRankData, error } = await supabase
    .from('product_revenue_and_profit_rank')
    .select('*');

  if (error) throw new Error(error.message);

  return productProfitRankData;
}

export async function viewProductRevenueAndProfit({
  range,
}: {
  range?: {
    from: number;
    to: number;
  };
} = {}) {
  if (range?.from && range.to) {
    const { data, error } = await supabase
      .from('product_revenue_and_profit')
      .select('*')
      .range(range.from, range.to);
    if (error) throw new Error(error.message);
    return data;
  }
  const { data, error } = await supabase
    .from('product_revenue_and_profit')
    .select('*');
  if (error) throw new Error(error.message);
  return data;
}
