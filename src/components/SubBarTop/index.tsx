"use client";
import React, { useState } from "react";
import { IoCalendar, IoReload } from "react-icons/io5";
import DatePickerBI3 from "../DatePicker";
import { useAuthContext } from "@/contexts/AuthContext";
import { IoMdPerson } from "react-icons/io";
import InputSearch from "../InputSearch";
import moment from "moment";

const SubBarTop = () => {
  const {
    setFilialDocs,
    assignType,
    assignStatus,
    setAssignType,
    setAssignStatus,
    setSelectedRange,
    setCodeCustomer,
    setInputValue,
    dataInicial,
    dataFinal
  } = useAuthContext();

  const [inputCustomer, setInputCustomer] = useState("");

  const handleSignedDownlod = () => {
    setAssignStatus({ "statusa": "A", "statusb": "D" });
    setSelectedRange({
      from: {
        year: parseInt(moment(dataInicial).format('YYYY')),
        month: parseInt(moment(dataInicial).format('MM')),
        day: parseInt(moment(dataInicial).format('DD')),
      },
      to: {
        year: parseInt(moment(dataFinal).format('YYYY')),
        month: parseInt(moment(dataFinal).format('MM')),
        day: parseInt(moment(dataFinal).format('DD')),
      },
    })
  }

  const resetFilters = () => {
    setSelectedRange({
      from: null,
      to: null,
    });
    setFilialDocs(null);
    setCodeCustomer(0);
    setInputValue("");
  };

  const handleCustomer = (e: any) => {
    const value = e.target.value.toLowerCase();
    setInputCustomer(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCodeCustomer(inputCustomer)
    setInputCustomer("")
  }

  return (
    <>
      <div className="container m-auto flex items-center justify-between bg-gray-50 p-2 shadow rounded-md">
        <button
          onClick={() => resetFilters()}
          title="Resetar filtros"
          className="mr-2 p-1 rounded-md bg-solar-green-primary text-solar-blue-secundary border border-solar-gray-200 shadow-sm"
        >
          <IoReload size={21} />
        </button>
        <div className="flex items-center justify-center border rounded-md text-gray-400 mr-5 py-0.5 px-2">
          <IoCalendar size={18} />
          <DatePickerBI3 />
        </div>
        <div className="flex-none mr-5 relative">
          <form onSubmit={handleSubmit}>
            <input
              className="border w-full border-gray-300 rounded h-8 text-gray-500 text-sm placeholder:text-sm px-1 py-1"
              type="text"
              placeholder="Código cliente"
              onChange={handleCustomer}
              value={inputCustomer}
            />
            <button
              type="submit"
            >
              <IoMdPerson
                size={22}
                className="absolute right-2 top-1 cursor-pointer text-solar-wine-support"
              />
            </button>
          </form>
        </div>
        <div className="flex-1">
          <InputSearch />
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
          </ul>
        </div>
      </div>
    </>
  );
};

export default SubBarTop;
