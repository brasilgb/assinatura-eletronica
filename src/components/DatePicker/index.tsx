"use client";
import React, { useEffect, useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, {
  DayRange,
} from "@hassanmojab/react-modern-calendar-datepicker";
import moment from "moment";
import { CustomLocale } from "./LocaleCalendar";
import { useAuthContext } from "@/contexts/AuthContext";

const DatePickerBI3 = () => {
  const { dataFiltro, setDataInicial, setDataFinal, selectedRange, setSelectedRange } = useAuthContext();

// console.log('selectedRange', selectedRange.from);

  const formatInputRange = () => {
    const dateNow = new Date();
    if (!selectedRange) return "";
    return `${("0" + dateNow.getDay()).slice(-2) + "/" + ("0" + dateNow.getMonth()).slice(-2) + "/" + dateNow.getFullYear() + " - " + ("0" + dateNow.getDay()).slice(-2) + "/" + ("0" + dateNow.getMonth()).slice(-2) + "/" + dateNow.getFullYear()}`;
  };

  useEffect(() => {
    if (selectedRange) {
      setDataInicial(
        moment(
          selectedRange.from?.year +
          "-" +
          selectedRange.from?.month +
          "-" +
          selectedRange.from?.day,
          "YYYY-MM-DD",
        ).toDate(),
      );
      setDataFinal(
        moment(
          selectedRange.to?.year +
          "-" +
          selectedRange.to?.month +
          "-" +
          selectedRange.to?.day,
          "YYYY-MM-DD",
        ).toDate(),
      );
    }
  }, [selectedRange, setDataInicial, setDataFinal]);

  return (
    <DatePicker
      value={selectedRange}
      onChange={setSelectedRange}
      inputPlaceholder={`${moment(dataFiltro).format("DD/MM/YYYY")}`} // placeholder
      formatInputText={formatInputRange} // format value
      inputClassName="!border-0 outline-none !bg-transparent !text-gray-400 !font-medium !text-xs !px-1" // custom class
      calendarClassName="responsive-calendar"
      shouldHighlightWeekends
      locale={CustomLocale}
    />
  );
};

export default DatePickerBI3;
