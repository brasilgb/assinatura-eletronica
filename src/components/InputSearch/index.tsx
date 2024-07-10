import { useAuthContext } from "@/contexts/AuthContext";
import cailun from "@/services/cailun";
import React, { useEffect, useState } from 'react'
import { RiBrush2Fill } from "react-icons/ri";

const InputSearch = () => {

  const {
    setFilialDocs,
    inputValue,
    setInputValue
  } = useAuthContext();

  const [resultCities, setResultCities] = useState<any>([]);
  const [allCities, setAllCities] = useState<any>([]);

  useEffect(() => {
    const getAllFiliais = async () => {
      await cailun.get('(WS_LIST_SUBSIDIARIES)')
        .then((res) => {
          const { data } = res.data.response;
          setResultCities(data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getAllFiliais();
  }, []);

  const handleCities = async (e: any) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    if (value.length > 1) {
      const result = resultCities.filter((city: any) =>
        city.description.toLowerCase().includes(value),
      );
      setAllCities(result);
    } else {
      setAllCities([]);
    }
  };

  const handleChangeCity = (id: number, filial: string) => {
    setInputValue(filial);
    setFilialDocs(id);
    setAllCities([]);
  };

  return (
    <div className="relative">
      <div className="flex items-center relative">
        <input
          className="border w-full border-gray-300 rounded text-gray-500 text-xs h-8 placeholder:text-sm px-1 py-1 outline-none"
          type="text"
          placeholder="Filtrar por filial"
          onChange={handleCities}
          value={inputValue}
        />
        <RiBrush2Fill
          onClick={() => {
            setFilialDocs(null);
            setInputValue("");
          }} 
          size={22}
          className="absolute right-2 cursor-pointer text-solar-wine-support"
        />
      </div>

      {allCities.length > 0 && (
        <div className="absolute bg-gray-50 border border-gray-200 w-full top-8 rounded shadow-md text-sm text-gray-500 max-h-60 overflow-y-auto z-40">
          <ul className="p-1">
            {allCities?.map((city: any, idx: number) => (
              <li
                key={idx}
                className={`text-xs ${idx < allCities?.length - 1 && "border-b border-b-gray-300"}`}
              >
                <button
                  onClick={() =>
                    handleChangeCity(city?.number, city?.description)
                  }
                  className="w-full py-1 text-left hover:bg-white"
                >
                  {city?.description}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default InputSearch