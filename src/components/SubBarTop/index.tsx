"use client";
import React, { useEffect, useState } from "react";
import { IoCalendar } from "react-icons/io5";
import DatePickerBI3 from "../DatePicker";
import { useAuthContext } from "@/contexts/AuthContext";
import { RiBrush2Fill } from "react-icons/ri";

async function getData() {
  const res = await fetch(
    "http://api.gruposolar.com.br:8085/api/filiaisativas",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const SubBarTop = () => {
  const {
    setFilialDocs,
    assignType,
    assignStatus,
    setAssignType,
    setAssignStatus,
    setDataInicial
  } = useAuthContext();
  const [cities, setCities] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");
  const [showCities, setShowCities] = useState(false);

  const handleCities = async (e: any) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    if (value.length > 2) {
      const city = await getData();
      const result = city.filter((c: any) =>
        c.NomeFilial.toLowerCase().includes(value),
      );
      setCities(result);
      setShowCities(true);
    }
  };

  useEffect(() => {
    if (inputValue === "") {
      setCities([]);
    }
  }, [inputValue]);

  const handleChangeCity = (id: number, filial: string) => {
    setInputValue(filial);
    setFilialDocs(id);
    setShowCities(false);
  };

  const handleSignedDownlod = () => {
    setAssignStatus({ "statusa": "A", "statusb": "D" });
    setDataInicial(new Date());
  }

  return (
    <>
      <div className="container m-auto flex items-center justify-between bg-gray-50 p-2 shadow rounded-md">
        <div className="flex items-center justify-center border rounded-md text-gray-400 mr-10 py-0.5 px-2">
          <IoCalendar size={18} />
          <DatePickerBI3 />
        </div>
        <div className="flex-1 relative">
          <div className="flex items-center relative">
            <input
              className="border w-full border-gray-300 rounded text-gray-500 text-sm placeholder:text-sm px-1 py-1"
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
            <div className="absolute bg-white border border-gray-200 w-full top-8 rounded shadow-md text-sm text-gray-500 max-h-60 overflow-y-auto">
              <ul className="p-1">
                {cities.map((city: any, idx: number) => (
                  <li
                    key={idx}
                    className={`py-1 text-xs ${idx < cities.length - 1 && "border-b border-b-gray-300"}`}
                  >
                    <button
                      onClick={() =>
                        handleChangeCity(city.CodFilial, city.NomeFilial)
                      }
                      className="w-full text-left"
                    >
                      {city.NomeFilial}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="md:ml-10">
          <ul className="pr-10 flex items center justify-start gap-6">
            <li>
              <button
                onClick={() => setAssignType("V")}
                className={`w-32 flex items-center justify-center py-1.5 rounded md:text-xs text-[10px] text-center font-medium uppercase border hover:bg-solar-blue-secundary hover:text-white duration-300 border-solar-gray-200 text-gray-500 ${assignType === "V" ? "bg-solar-blue-secundary text-white" : ""}`}
              >
                Vendas
              </button>
            </li>
            <li>
              <button
                onClick={() => setAssignType("N")}
                className={`w-32 flex items-center justify-center py-1.5 rounded md:text-xs text-[10px] text-center font-medium uppercase border hover:bg-solar-blue-secundary hover:text-white duration-300 border-solar-gray-200 text-gray-500 ${assignType === "N" ? "bg-solar-blue-secundary text-white" : ""}`}
              >
                Novação
              </button>
            </li>
          </ul>
        </div>

        <div className="md:ml-10">
          <ul className="pr-10 flex items center justify-start gap-6">
            <li>
              <button
                onClick={() => setAssignStatus({ "statusa": "P", "statusb": "E" })}
                className={`w-32 flex items-center justify-center py-1.5 rounded md:text-xs text-[10px] text-center font-medium uppercase border hover:bg-solar-green-primary hover:text-solar-blue-secundary duration-300 border-solar-gray-200 text-gray-500 ${assignStatus.statusa === "P" && assignStatus.statusb === "E" ? "bg-solar-green-primary text-solar-blue-secundary" : ""}`}
              >
                Pendentes
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSignedDownlod()}
                className={`w-32 flex items-center justify-center py-1.5 rounded md:text-xs text-[10px] text-center font-medium uppercase border hover:bg-solar-green-primary hover:text-solar-blue-secundary duration-300 border-solar-gray-200 text-gray-500 ${assignStatus.statusa === "A" && assignStatus.statusb === "D" ? "bg-solar-green-primary text-solar-blue-secundary" : ""}`}
              >
                Assinados
              </button>
            </li>
            {/* <li>
              <button
                onClick={() => setAssignStatus("D")}
                className={`w-32 flex items-center justify-center py-1.5 rounded md:text-xs text-[10px] text-center font-medium uppercase border hover:bg-solar-green-primary hover:text-solar-blue-secundary duration-300 border-solar-gray-200 text-gray-500 ${assignStatus === "D" ? "bg-solar-green-primary text-solar-blue-secundary" : ""}`}
              >
                Downloads
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SubBarTop;
