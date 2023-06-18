import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Card, Grid, Select, SelectItem } from "@tremor/react";
import { postInflows } from "../Context";

type Props = {
  isOpen: any;
  closeModal: any;
};

interface ICategory {
  category: string;
}

interface IRawItems {
  id: string;
  name: string;
  category: string;
}

const rawItems: IRawItems[] = [
  {
    id: "r1",
    name: "sales",
    category: "sales",
  },
  {
    id: "r2",
    name: "grant",
    category: "grant",
  },
];

const Modal2 = ({ isOpen, closeModal }: Props) => {
  const [itemCat, setItemCat] = useState<string>("");

  const [inputValues2, setInputValues2] = useState({
    category: "sales",
    amount: 0.0,
    cashFlowId: 3,
  });

  console.log(inputValues2, "iv2");

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-screen-md max-h-max transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Inflow
                  </Dialog.Title>
                  <div className="flex mt-2 mb-16 ">
                    <p className="text-sm text-gray-500">Choose an item</p>
                    <div className="max-w-sm mx-auto space-y-6">
                      <Select>
                        {rawItems.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.name}
                            onClick={() => (
                              setItemCat(item.category),
                              console.log(item.category)
                            )}
                            onChange={(e) =>
                              //@ts-ignore
                              setInputValues2((prevValues) => ({
                                ...prevValues,
                                //@ts-ignore
                                category: e.target.value,
                              }))
                            }
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-center bg-slate-50 p-8">
                    <Grid numItemsMd={1} numItemsLg={1}>
        
                    
                          <div className="flex flex-row p-4">
                            <div className="">category</div>
                            <input
                              type="text"
                              id="category"
                              value={inputValues2.category}
                              onChange={(e) =>
                                //@ts-ignore
                                setInputValues2((prevValues) => ({
                                  ...prevValues,
                                  category: e.target.value,
                                }))
                              }
                              placeholder={`Enter a value`}
                              className="w-40 p-2 border border-gray-300 rounded transition duration-500 ease-in-out focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                         
                          <div className="flex flex-row p-4">
                            <div>amount</div>
                            <input
                              type="number"
                              id="amount"
                              value={inputValues2.amount}
                              onChange={(e) =>
                                //@ts-ignore
                                setInputValues2((prevValues) => ({
                                  ...prevValues,
                                  amount: e.target.value,
                                }))
                              }
                              placeholder={`Enter a value`}
                              className="w-40 p-2 border border-gray-300 rounded transition duration-500 ease-in-out focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                     
                    </Grid>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() =>
                        postInflows(
                          inputValues2.category,
                          inputValues2.amount,
                          inputValues2.cashFlowId
                        )
                      }
                    >
                      Submit
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal2;
