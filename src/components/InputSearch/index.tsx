import { useAuthContext } from "@/contexts/AuthContext";
import cailun from "@/services/cailun";
import React, { useEffect, useState } from 'react'
import { RiBrush2Fill } from "react-icons/ri";

const InputSearch = () => {

    const {
        setFilialDocs,
      } = useAuthContext();

    const [allCities, setAllCities] = useState<any>([]);
    const [showCities, setShowCities] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const getAllFiliais = async() => {
            await cailun.get('(WS_LIST_SUBSIDIARIES)')
            .then((res) => {
                const { data } = res.data.response;
                setAllCities(data);
                console.log(data);
                
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
      if (value.length > 2) {
        const result = allCities.filter((c: any) =>
          c.description.toLowerCase().includes(value),
        );
        setAllCities(result);
        setShowCities(true);
      }
    };
  
    useEffect(() => {
      if (inputValue === "") {
        setAllCities([]);
      }
    }, [inputValue]);
  
    const handleChangeCity = (id: number, filial: string) => {
      setInputValue(filial);
      setFilialDocs(id);
      setShowCities(false);
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
          setFilialDocs(0);
          setInputValue("");
        }}
        size={22}
        className="absolute right-2 cursor-pointer text-solar-wine-support"
      />
    </div>

    {showCities && inputValue.length > 2 && (
      <div className="absolute bg-gray-50 border border-gray-200 w-full top-8 rounded shadow-md text-sm text-gray-500 max-h-60 overflow-y-auto">
        <ul className="p-1">
          {allCities.map((city: any, idx: number) => (
            <li
              key={idx}
              className={`py-1 text-xs ${idx < allCities.length - 1 && "border-b border-b-gray-300"}`}
            >
              <button
                onClick={() =>
                  handleChangeCity(city.number, city.description)
                }
                className="w-full text-left"
              >
                {city.description}
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