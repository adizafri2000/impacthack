import { DeltaType } from "@tremor/react";

export type Kpi = {
  title: string;
  metric: string;
  progress: number;
  target: string;
  delta: string;
  deltaType: DeltaType;
};

export const cashflowData: Kpi[] = [
  {
    title: "Inflow Invoices",
    metric: "RM 12,699",
    progress: 15.9,
    target: "RM 80,000",
    delta: "13.2%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Outflow Invoices",
    metric: "RM 45,564",
    progress: 36.5,
    target: "RM 125,000",
    delta: "23.9%",
    deltaType: "increase",
  },
  {
    title: "Revenue",
    metric: "1,072",
    progress: 53.6,
    target: "2,000",
    delta: "10.1%",
    deltaType: "moderateDecrease",
  },
  {
    title: "Closing Balance",
    metric: "1,072",
    progress: 53.6,
    target: "2,000",
    delta: "10.1%",
    deltaType: "moderateDecrease",
  },
];

export const dataListItem = [
    {
      name: "Kacang",
      value: 20,
      href: "https://twitter.com/tremorlabs",
      icon: function TwitterIcon() {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2.5 fill-blue-500"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
          </svg>
        );
      },
    },
    {
      name: "Madu",
      value: 10,
      href: "https://google.com",
      icon: function GoogleIcon() {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2.5 fill-slate-500"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3.064 7.51A9.996 9.996 0 0 1 12 2c2.695 0 4.959.99 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123-.2.6-.314 1.24-.314 1.9 0 .66.114 1.3.314 1.9.786 2.364 2.99 4.123 5.595 4.123 1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045 0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49z" />
          </svg>
        );
      },
    },
    {
      name: "Wrapper",
      value: 5,
      href: "https://github.com/tremorlabs/tremor",
      icon: function GitHubIcon() {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2.5 fill-slate-900"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
          </svg>
        );
      },
    },
  ];

  //cashflow page

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
  