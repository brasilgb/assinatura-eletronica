"use client";
import React from "react";
import { IoCalendar, IoReload } from "react-icons/io5";
import DatePickerBI3 from "../DatePicker";
import { useAuthContext } from "@/contexts/AuthContext";
import InputSearch from "../InputSearch";
import moment from "moment";
import FormCliente from "../Forms/FormCliente";
import FormNota from "../Forms/FormNota";
import ContratosPdf from "../ContratosPdf";

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
    setInputCustomer,
    setInputNota,
    setCodeNota,
    assignDocs
  } = useAuthContext();

  const handleSignedDownlod = () => {
    setAssignStatus({ "statusa": "A", "statusb": "D" });
    setSelectedRange({
      from: {
        year: parseInt(moment().format('YYYY')),
        month: parseInt(moment().format('MM')),
        day: parseInt(moment().format('DD')),
      },
      to: {
        year: parseInt(moment().format('YYYY')),
        month: parseInt(moment().format('MM')),
        day: parseInt(moment().format('DD')),
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
    setCodeNota("");
    setInputValue("");
    setInputCustomer("");
    setInputNota("")
  };

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
        <div className="flex-1 flex gap-4 mr-4">
          <FormCliente />
          <FormNota />
        </div>
        <div className="flex-1">
          <InputSearch />
        </div>
        <div className="md:ml-4">
          <ContratosPdf assignDocs={assignDocs} />
        </div>
        <div className="md:ml-4">
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
