import React, { useState, createContext, useEffect, useRef } from "react";

type DataContextType = {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
};

export const DataContext = createContext<any>(null);

//function to fetch API

export async function getCashflows() {
  const res = await fetch("http://192.168.0.100:8081/cashflows");
  const result = await res.json();
  if (result.isError) {
    throw new Error(result.errorMessage);
  }
  if (result) {
    return result;
  } else {
    return [];
  }
}

export async function getInflows() {
  const res = await fetch("http://192.168.0.100:8081/inflows");
  const result = await res.json();
  if (result.isError) {
    throw new Error(result.errorMessage);
  }
  if (result) {
    return result;
  } else {
    return [];
  }
}

const fileInput = document.querySelector("#fileInput") as HTMLInputElement;
const formdata = new FormData();
if (fileInput && fileInput.files) {
  formdata.append("ikea1", fileInput.files[0], "src/assets/ikea1.png");
}

const requestOptions: {
  method: string;
  body: FormData;
  redirect: RequestRedirect;
} = {
  method: "POST",
  body: formdata,
  redirect: "follow",
};

// API OCR
export async function postOCR() {
  const res = await fetch(
    "http://192.168.0.100/ocr-impacthack/scan_receipt.php",
    requestOptions
  );
  console.log(res, "ocr");
  const result = await res.json();
  console.log(result, "resut");
  if (result.isError) {
    throw new Error(result.errorMessage);
  }
  if (result) {
    return result;
  } else {
    return [];
  }
}

export async function postInflows(
    categoryValue: any,
    amountValue: any,
    cashFlowIdValue: any,
  ) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      category: categoryValue,
      amount: amountValue,
      cashFlowId: cashFlowIdValue,
    });
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    //@ts-ignore
  fetch("http://192.168.0.100:8081/inflow", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
}


export async function postIndirect(
  categoryValue: any,
  priceValue: any,
  cashFlowIdValue: any,
  receiptIdValue: any
) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    category: categoryValue,
    price: priceValue,
    cashFlowId: cashFlowIdValue,
    receiptId: receiptIdValue,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  //@ts-ignore
  fetch("http://192.168.0.100:8081/indirect", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

export async function postDirect(
  categoryValue: any,
  unitValue: any,
  quantityValue: any,
  unitPriceValue: any,
  cashFlowIdValue: any
) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Replace hardcoded values with variables
  // var categoryValue = "shopping";
  // var priceValue = 210.55;
  // var cashFlowIdValue = 3;
  // var receiptIdValue = 4;

  var raw = JSON.stringify({
    category: categoryValue,
    unit: unitValue,
    quantity: quantityValue,
    unitPrice: unitPriceValue,
    cashFlowId: cashFlowIdValue,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  //@ts-ignore
  fetch("http://192.168.0.115:8080/api/directs", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

export const DataProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cashFlowData, setCashFlowData] = useState(null);
  const [inFlowData, setInflowData] = useState(null);
  const dataFetchedRef = useRef(false);
  const [clsblc, setClsblc] = useState<any>(null)

  const date = new Date();

  const fetchData = async () => {
    console.log("fetch");
    setIsLoading(true);
    try {
      const res = await getCashflows();
      //   const resOCR = await postOCR();
      setCashFlowData(res);

      const res2 = await getInflows();
      setInflowData(res2);

      //   const resPostIndirect = await postIndirect("rental",105.22,2,3);
      //   console.log(resPostIndirect, "post  indirect");
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // if (dataFetchedRef.current) return;
    // dataFetchedRef.current = true;
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ isLoading, date, cashFlowData, clsblc, setClsblc }}>
      {props.children}
    </DataContext.Provider>
  );
};
