import { DeltaType } from "@tremor/react";

export type Kpi = {
  title: string;
  metric: any;
  delta: string;
  deltaType: DeltaType;
};

export const cashflowData: Kpi[] = [
  {
    title: "Inflow",
    metric: 5000,
    delta: "",
    deltaType: "moderateIncrease",
  },
  {
    title: "Outflow",
    metric: 3000,
    delta: "",
    deltaType: "moderateIncrease",
  },
  {
    title: "Profit",
    metric: 5000,
    delta: "",
    deltaType: "moderateIncrease",
  },
  {
    title: "Closing Balance",
    metric: 2000,
    delta: "",
    deltaType: "moderateIncrease",
  },
];

export const dataListItem = [
    {
      name: "Chocolate",
      value: 855,    
    },
    {
      name: "Madu",
      value: 500,
    },
    {
      name: "Wrapper",
      value: 450,
    },
  ];



  export type flow = {
    title: string;
    value: string;
    prevVal: string;
    delta: string;
    deltaType: DeltaType;
  };
  
  export const flowItem: flow[] = [
    {
      title: "Inflow",
      value: "RM 50,000",
      prevVal: "RM 40,000",
      delta: "25%",
      deltaType: "moderateIncrease",
    },
    {
      title: "Outflow",
      value: "RM 35,000",
      prevVal: "RM 30,000",
      delta: "8.25%",
      deltaType: "moderateIncrease",
    },
  ];

  // inflow table  data
  export type Items = {
    name: string;
    value: string;
    status: string;
  };
  
  export const inflowTableItem: Items[] = [
    {
      name: "Sales",
      value: "30,000",
      status: "overperforming",
    },
    {
      name: "Other Income",
      value: "5,000",
      status: "overperforming",
    },
    {
      name: "Loan Proceeds",
      value: "10,000",
      status: "overperforming",
    },
  ];

  //outfloww table data
  export const OutflowTableItem: Items[] = [
    {
      name: "Ficed Operating Expenses",
      value: "30,000",
      status: "overperforming",
    },
    {
      name: "Budgeted Operating Services",
      value: "5,000",
      status: "overperforming",
    },
    {
      name: "Debt Services",
      value: "10,000",
      status: "overperforming",
    },
  ];
  

  export const lineChartdata = [
    {
      year: "Jan",
      "Export Growth Rate": 30000,
    },
    {
      year: "Feb",
      "Export Growth Rate": 25000,
    },
    {
      year: "Mar",
      "Export Growth Rate": 32000,
    },
    {
      year: "Apr",
      "Export Growth Rate": 28000,
    },
    {
      year: "May",
      "Export Growth Rate": 34000,
    },
  ];
  
  export const chartdata = [
    {
      name: "Jan",
      "Number of threatened species": 2488,
    },
    {
      name: "Feb",
      "Number of threatened species": 1445,
    },
    {
      name: "Mar",
      "Number of threatened species": 743,
    },
    {
      name: "Apr",
      "Number of threatened species": 743,
    },
    {
      name: "May",
      "Number of threatened species": 743,
    },
  ];

  //inventory
  export type priceTableItems = {
    name: string;
    unit: string;
    curPrice: number;
    prevPrice: number;
    difference: number;
    delta: number;
    status: string;
  };
  
  //tambah category; direct/ indirect
  export const priceTableData: priceTableItems[] = [
    {
      name: "Kacang",
      unit: "kg",
      curPrice: 10.0,
      prevPrice: 9.0,
      difference: 1.0,
      delta: 1.25,
      status: "overperforming",
    },
    {
      name: "Chocolate",
      unit: "kg",
      curPrice: 10.0,
      prevPrice: 9.0,
      difference: 1.0,
      delta: 1.25,
      status: "overperforming",
    },
    {
      name: "Madu",
      unit: "kg",
      curPrice: 10.0,
      prevPrice: 9.0,
      difference: 1.0,
      delta: 1.25,
      status: "overperforming",
    },
    {
      name: "Bottle",
      unit: "pcs",
      curPrice: 9.0,
      prevPrice: 10.0,
      difference: 1,
      delta: 0.9,
      status: "underperforming",
    },
    {
      name: "Cap",
      unit: "pcs",
      curPrice: 10.0,
      prevPrice: 10.0,
      difference: 0,
      delta: 0,
      status: "unchanged",
    },
    {
      name: "Wrapper",
      unit: "pcs",
      curPrice: 10.0,
      prevPrice: 10.0,
      difference: 0.0,
      delta: 0,
      status: "unchanged",
    },
  ];

  export const increasedItems = [
    {
      name: "Kacang",
      quantity: 9800,
    },
    {
      name: "Chocolate",
      quantity: 4567,
    },
    {
      name: "Honey",
      quantity: 3908,
    },
    {
      name: "Bottle",
      quantity: 2400,
    },
    {
      name: "Cap",
      quantity: 1908,
    },
    {
      name: "Wrapper",
      quantity: 1398,
    },
  ];
  

  //projections

  type configItem = {
    id: string;
    name: string;

  }

  export const configData: configItem[] = [
    {
      id: "c1",
      name: "Inflow"
    },
    {
      id: "c2",
      name: "Outflow"
    },
    {
      id: "c3",
      name: "Revenue"
    },
    {
      id: "c4",
      name: "Closing"
    },
  ]