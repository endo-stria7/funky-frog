export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          category_id: number;
          category_name: string;
          description: string | null;
          picture: string | null;
        };
        Insert: {
          category_id: number;
          category_name: string;
          description?: string | null;
          picture?: string | null;
        };
        Update: {
          category_id?: number;
          category_name?: string;
          description?: string | null;
          picture?: string | null;
        };
        Relationships: [];
      };
      customer_customer_demo: {
        Row: {
          customer_id: string;
          customer_type_id: string;
        };
        Insert: {
          customer_id: string;
          customer_type_id: string;
        };
        Update: {
          customer_id?: string;
          customer_type_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_customer_customer_demo_customer_demographics';
            columns: ['customer_type_id'];
            isOneToOne: false;
            referencedRelation: 'customer_demographics';
            referencedColumns: ['customer_type_id'];
          },
          {
            foreignKeyName: 'fk_customer_customer_demo_customers';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_info';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'fk_customer_customer_demo_customers';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['customer_id'];
          },
        ];
      };
      customer_demographics: {
        Row: {
          customer_desc: string | null;
          customer_type_id: string;
        };
        Insert: {
          customer_desc?: string | null;
          customer_type_id: string;
        };
        Update: {
          customer_desc?: string | null;
          customer_type_id?: string;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          address: string | null;
          city: string | null;
          company_name: string;
          contact_name: string | null;
          contact_title: string | null;
          country: string | null;
          customer_id: string;
          fax: string | null;
          phone: string | null;
          postal_code: string | null;
          region: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          company_name: string;
          contact_name?: string | null;
          contact_title?: string | null;
          country?: string | null;
          customer_id: string;
          fax?: string | null;
          phone?: string | null;
          postal_code?: string | null;
          region?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          company_name?: string;
          contact_name?: string | null;
          contact_title?: string | null;
          country?: string | null;
          customer_id?: string;
          fax?: string | null;
          phone?: string | null;
          postal_code?: string | null;
          region?: string | null;
        };
        Relationships: [];
      };
      employee_territories: {
        Row: {
          employee_id: number;
          territory_id: string;
        };
        Insert: {
          employee_id: number;
          territory_id: string;
        };
        Update: {
          employee_id?: number;
          territory_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_employee_territories_employees';
            columns: ['employee_id'];
            isOneToOne: false;
            referencedRelation: 'employees';
            referencedColumns: ['employee_id'];
          },
          {
            foreignKeyName: 'fk_employee_territories_employees';
            columns: ['employee_id'];
            isOneToOne: false;
            referencedRelation: 'recent_sales_by_employee';
            referencedColumns: ['employee_id'];
          },
          {
            foreignKeyName: 'fk_employee_territories_territories';
            columns: ['territory_id'];
            isOneToOne: false;
            referencedRelation: 'territories';
            referencedColumns: ['territory_id'];
          },
        ];
      };
      employees: {
        Row: {
          address: string | null;
          birth_date: string | null;
          city: string | null;
          country: string | null;
          employee_id: number;
          extension: string | null;
          first_name: string;
          hire_date: string | null;
          home_phone: string | null;
          last_name: string;
          notes: string | null;
          photo: string | null;
          photo_path: string | null;
          postal_code: string | null;
          region: string | null;
          reports_to: number | null;
          title: string | null;
          title_of_courtesy: string | null;
        };
        Insert: {
          address?: string | null;
          birth_date?: string | null;
          city?: string | null;
          country?: string | null;
          employee_id: number;
          extension?: string | null;
          first_name: string;
          hire_date?: string | null;
          home_phone?: string | null;
          last_name: string;
          notes?: string | null;
          photo?: string | null;
          photo_path?: string | null;
          postal_code?: string | null;
          region?: string | null;
          reports_to?: number | null;
          title?: string | null;
          title_of_courtesy?: string | null;
        };
        Update: {
          address?: string | null;
          birth_date?: string | null;
          city?: string | null;
          country?: string | null;
          employee_id?: number;
          extension?: string | null;
          first_name?: string;
          hire_date?: string | null;
          home_phone?: string | null;
          last_name?: string;
          notes?: string | null;
          photo?: string | null;
          photo_path?: string | null;
          postal_code?: string | null;
          region?: string | null;
          reports_to?: number | null;
          title?: string | null;
          title_of_courtesy?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_employees_employees';
            columns: ['reports_to'];
            isOneToOne: false;
            referencedRelation: 'employees';
            referencedColumns: ['employee_id'];
          },
          {
            foreignKeyName: 'fk_employees_employees';
            columns: ['reports_to'];
            isOneToOne: false;
            referencedRelation: 'recent_sales_by_employee';
            referencedColumns: ['employee_id'];
          },
        ];
      };
      notes: {
        Row: {
          id: number;
          title: string | null;
        };
        Insert: {
          id?: number;
          title?: string | null;
        };
        Update: {
          id?: number;
          title?: string | null;
        };
        Relationships: [];
      };
      order_details: {
        Row: {
          discount: number;
          order_id: number;
          product_id: number;
          quantity: number;
          unit_price: number;
        };
        Insert: {
          discount: number;
          order_id: number;
          product_id: number;
          quantity: number;
          unit_price: number;
        };
        Update: {
          discount?: number;
          order_id?: number;
          product_id?: number;
          quantity?: number;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_order_details_orders';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['order_id'];
          },
          {
            foreignKeyName: 'fk_order_details_orders';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'recent_sales_by_customer';
            referencedColumns: ['order_id'];
          },
          {
            foreignKeyName: 'fk_order_details_products';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product_details';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'fk_order_details_products';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product_revenue_and_profit';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'fk_order_details_products';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product_revenue_and_profit_rank';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'fk_order_details_products';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          },
        ];
      };
      orders: {
        Row: {
          customer_id: string | null;
          employee_id: number | null;
          freight: number | null;
          order_date: string | null;
          order_id: number;
          required_date: string | null;
          ship_address: string | null;
          ship_city: string | null;
          ship_country: string | null;
          ship_name: string | null;
          ship_postal_code: string | null;
          ship_region: string | null;
          ship_via: number | null;
          shipped_date: string | null;
        };
        Insert: {
          customer_id?: string | null;
          employee_id?: number | null;
          freight?: number | null;
          order_date?: string | null;
          order_id: number;
          required_date?: string | null;
          ship_address?: string | null;
          ship_city?: string | null;
          ship_country?: string | null;
          ship_name?: string | null;
          ship_postal_code?: string | null;
          ship_region?: string | null;
          ship_via?: number | null;
          shipped_date?: string | null;
        };
        Update: {
          customer_id?: string | null;
          employee_id?: number | null;
          freight?: number | null;
          order_date?: string | null;
          order_id?: number;
          required_date?: string | null;
          ship_address?: string | null;
          ship_city?: string | null;
          ship_country?: string | null;
          ship_name?: string | null;
          ship_postal_code?: string | null;
          ship_region?: string | null;
          ship_via?: number | null;
          shipped_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_orders_customers';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_info';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'fk_orders_customers';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'fk_orders_employees';
            columns: ['employee_id'];
            isOneToOne: false;
            referencedRelation: 'employees';
            referencedColumns: ['employee_id'];
          },
          {
            foreignKeyName: 'fk_orders_employees';
            columns: ['employee_id'];
            isOneToOne: false;
            referencedRelation: 'recent_sales_by_employee';
            referencedColumns: ['employee_id'];
          },
          {
            foreignKeyName: 'fk_orders_shippers';
            columns: ['ship_via'];
            isOneToOne: false;
            referencedRelation: 'shippers';
            referencedColumns: ['shipper_id'];
          },
        ];
      };
      products: {
        Row: {
          categories?: { category_name: string };
          suppliers?: { company_name: string };
          category_id: number | null;
          discontinued: number;
          product_id: number;
          product_name: string;
          quantity_per_unit: string | null;
          reorder_level: number | null;
          supplier_id: number | null;
          unit_price: number | null;
          units_in_stock: number | null;
          units_on_order: number | null;
        };
        Insert: {
          category_id?: number | null;
          discontinued: number;
          product_id: number;
          product_name: string;
          quantity_per_unit?: string | null;
          reorder_level?: number | null;
          supplier_id?: number | null;
          unit_price?: number | null;
          units_in_stock?: number | null;
          units_on_order?: number | null;
        };
        Update: {
          category_id?: number | null;
          discontinued?: number;
          product_id?: number;
          product_name?: string;
          quantity_per_unit?: string | null;
          reorder_level?: number | null;
          supplier_id?: number | null;
          unit_price?: number | null;
          units_in_stock?: number | null;
          units_on_order?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_products_categories';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['category_id'];
          },
          {
            foreignKeyName: 'fk_products_suppliers';
            columns: ['supplier_id'];
            isOneToOne: false;
            referencedRelation: 'suppliers';
            referencedColumns: ['supplier_id'];
          },
        ];
      };
      region: {
        Row: {
          region_description: string;
          region_id: number;
        };
        Insert: {
          region_description: string;
          region_id: number;
        };
        Update: {
          region_description?: string;
          region_id?: number;
        };
        Relationships: [];
      };
      shippers: {
        Row: {
          company_name: string;
          phone: string | null;
          shipper_id: number;
        };
        Insert: {
          company_name: string;
          phone?: string | null;
          shipper_id: number;
        };
        Update: {
          company_name?: string;
          phone?: string | null;
          shipper_id?: number;
        };
        Relationships: [];
      };
      suppliers: {
        Row: {
          address: string | null;
          city: string | null;
          company_name: string;
          contact_name: string | null;
          contact_title: string | null;
          country: string | null;
          fax: string | null;
          homepage: string | null;
          phone: string | null;
          postal_code: string | null;
          region: string | null;
          supplier_id: number;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          company_name: string;
          contact_name?: string | null;
          contact_title?: string | null;
          country?: string | null;
          fax?: string | null;
          homepage?: string | null;
          phone?: string | null;
          postal_code?: string | null;
          region?: string | null;
          supplier_id: number;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          company_name?: string;
          contact_name?: string | null;
          contact_title?: string | null;
          country?: string | null;
          fax?: string | null;
          homepage?: string | null;
          phone?: string | null;
          postal_code?: string | null;
          region?: string | null;
          supplier_id?: number;
        };
        Relationships: [];
      };
      territories: {
        Row: {
          region_id: number;
          territory_description: string;
          territory_id: string;
        };
        Insert: {
          region_id: number;
          territory_description: string;
          territory_id: string;
        };
        Update: {
          region_id?: number;
          territory_description?: string;
          territory_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_territories_region';
            columns: ['region_id'];
            isOneToOne: false;
            referencedRelation: 'region';
            referencedColumns: ['region_id'];
          },
        ];
      };
      us_states: {
        Row: {
          state_abbr: string | null;
          state_id: number;
          state_name: string | null;
          state_region: string | null;
        };
        Insert: {
          state_abbr?: string | null;
          state_id: number;
          state_name?: string | null;
          state_region?: string | null;
        };
        Update: {
          state_abbr?: string | null;
          state_id?: number;
          state_name?: string | null;
          state_region?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      customer_info: {
        Row: {
          address: string | null;
          city: string | null;
          company_name: string | null;
          contact_name: string | null;
          contact_title: string | null;
          country: string | null;
          customer_id: string | null;
          order_date: string | null;
          phone: string | null;
          required_date: string | null;
          shipped_date: string | null;
        };
        Relationships: [];
      };
      product_details: {
        Row: {
          category_name: string | null;
          company_name: string | null;
          description: string | null;
          discontinued: number | null;
          product_id: number | null;
          product_name: string | null;
          quantity_per_unit: string | null;
          reorder_level: number | null;
          unit_price: number | null;
          units_in_stock: number | null;
          units_on_order: number | null;
        };
        Relationships: [];
      };
      product_revenue_and_profit: {
        Row: {
          product_id: number | null;
          product_name: string | null;
          profit_margin: number | null;
          total_profit: number | null;
          total_revenue: number | null;
        };
        Relationships: [];
      };
      product_revenue_and_profit_rank: {
        Row: {
          category_id: number | null;
          discontinued: number | null;
          product_id: number | null;
          product_name: string | null;
          profit_margin: number | null;
          profit_margin_rank: number | null;
          quantity_per_unit: string | null;
          reorder_level: number | null;
          supplier_id: number | null;
          unit_price: number | null;
          units_in_stock: number | null;
          units_on_order: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_products_categories';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['category_id'];
          },
          {
            foreignKeyName: 'fk_products_suppliers';
            columns: ['supplier_id'];
            isOneToOne: false;
            referencedRelation: 'suppliers';
            referencedColumns: ['supplier_id'];
          },
        ];
      };
      recent_sales_by_customer: {
        Row: {
          customer_id: string | null;
          customer_name: string | null;
          employee_id: number | null;
          freight: number | null;
          order_date: string | null;
          order_id: number | null;
          required_date: string | null;
          ship_address: string | null;
          ship_city: string | null;
          ship_country: string | null;
          ship_name: string | null;
          ship_postal_code: string | null;
          ship_region: string | null;
          ship_via: number | null;
          shipped_date: string | null;
          total_sales: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_orders_customers';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'fk_orders_customers';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_info';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'fk_orders_employees';
            columns: ['employee_id'];
            isOneToOne: false;
            referencedRelation: 'employees';
            referencedColumns: ['employee_id'];
          },
          {
            foreignKeyName: 'fk_orders_employees';
            columns: ['employee_id'];
            isOneToOne: false;
            referencedRelation: 'recent_sales_by_employee';
            referencedColumns: ['employee_id'];
          },
          {
            foreignKeyName: 'fk_orders_shippers';
            columns: ['ship_via'];
            isOneToOne: false;
            referencedRelation: 'shippers';
            referencedColumns: ['shipper_id'];
          },
        ];
      };
      recent_sales_by_employee: {
        Row: {
          address: string | null;
          birth_date: string | null;
          city: string | null;
          country: string | null;
          employee_id: number | null;
          extension: string | null;
          first_name: string | null;
          full_name: string | null;
          hire_date: string | null;
          home_phone: string | null;
          last_name: string | null;
          notes: string | null;
          order_date: string | null;
          photo: string | null;
          photo_path: string | null;
          postal_code: string | null;
          region: string | null;
          reports_to: number | null;
          title: string | null;
          title_of_courtesy: string | null;
          total_sales: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_employees_employees';
            columns: ['reports_to'];
            isOneToOne: false;
            referencedRelation: 'employees';
            referencedColumns: ['employee_id'];
          },
          {
            foreignKeyName: 'fk_employees_employees';
            columns: ['reports_to'];
            isOneToOne: false;
            referencedRelation: 'recent_sales_by_employee';
            referencedColumns: ['employee_id'];
          },
        ];
      };
    };
    Functions: {
      calculate_product_stats: {
        Args: Record<PropertyKey, never>;
        Returns: {
          f1: number;
          f2: number;
          f3: number;
        }[];
      };
      calculate_sumof_product_profit: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      customer_freight_total: {
        Args: Record<PropertyKey, never>;
        Returns: {
          customer_id: string;
          freight: number;
        }[];
      };
      filter_customers_by_city: {
        Args: Record<PropertyKey, never>;
        Returns: {
          city: string;
          company_name: string;
          contact_name: string;
        }[];
      };
      get_employee_manager: {
        Args: Record<PropertyKey, never>;
        Returns: {
          city: number;
          employee: string;
          manager: string;
        }[];
      };
      increment: {
        Args: {
          i: number;
        };
        Returns: number;
      };
      monthly_total_sales: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>[];
      };
      product_profit_margin_analysis: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>[];
      };
      product_sales_ranking: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
