import { useState, useContext } from "react";
import Slider from "rc-slider";
import { Select, SelectItem } from "@tremor/react";
import "rc-slider/assets/index.css";
import "tailwindcss/tailwind.css";
import { PlaygroundContext } from "../pages/Projections";

const MIN_VALUE = -1000; // Adjust the minimum value
const DEFAULT_MAX_VALUE = 100; // Adjust the maximum value

const ConfigTab = () => {
    const {selectedCategory, setSelectedCategory, userInputValue, setUserInputValue,isUpdate, setIsUpdate} = useContext(PlaygroundContext)
//   const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(DEFAULT_MAX_VALUE);
//   const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [prePassVal, setPrePassVal] = useState<number>(0)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === '') {
        setPrePassVal(0);
    } else if (Number(newValue) >= -maxValue && Number(newValue) <= maxValue) {
        setPrePassVal(Number(newValue));
    }
  };

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === "number") {
        setPrePassVal(value);
    }
  };

  const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = event.target.value;
    if (newMaxValue === "" || Number(newMaxValue) >= MIN_VALUE) {
      setMaxValue(Number(newMaxValue));
      if (userInputValue > Number(newMaxValue)) {
        setPrePassVal(Number(newMaxValue));
      }
      // Set the minimum value as the negative value of the new maximum value
      const newMinValue = -Number(newMaxValue);
      if (newMinValue <= userInputValue) {
        setPrePassVal(newMinValue)}
    }
  };

  const handleButtonClick = () => {
    setUserInputValue(prePassVal);
    console.log(prePassVal, "ppv");
    setIsUpdate(!isUpdate)
  };

  return (
    <div className="flex-1">
      <div className="flex items-center gap-4 py-4 mt-4">
        <Select
          id="category"
          className="max-w-full sm:max-w-xs"
          onValueChange={setSelectedCategory}
        >
          <SelectItem value="Inflow">Inflow</SelectItem>
          <SelectItem value="Outflow">Outflow</SelectItem>
          <SelectItem value="Profit">Profit</SelectItem>
          <SelectItem value="Closing">Closing</SelectItem>
        </Select>
      </div>
      <div className="flex items-center gap-4">
        {/* <input
          type="text"
          id="maxValue"
          value={maxValue}
          onChange={handleMaxValueChange}
          placeholder={`Enter a maximum value greater than or equal to ${MIN_VALUE}`}
          className="w-48 p-2 border border-gray-300 rounded transition duration-500 ease-in-out focus:ring-indigo-500 focus:border-indigo-500"
        /> */}
      </div>
      <div className="flex flex-col items-center gap-4 mt-4">
        <label htmlFor="value" className="text-lg mr-2">
          Value:
        </label>
        <input
          type="text"
          id="value"
          value={prePassVal}
          onChange={handleInputChange}
          placeholder={`Enter a value between ${MIN_VALUE} and ${maxValue}`}
          className="w-48 p-2 border border-gray-300 rounded transition duration-500 ease-in-out focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Slider
          value={prePassVal}
          onChange={handleSliderChange}
          min={0}
          max={10000}
          className="w-48 transition duration-500 ease-in-out"
        />
        <button onClick={handleButtonClick}>Update Value</button>
      </div>
    </div>
  );
};

export default ConfigTab;
