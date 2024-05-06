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
    if (!selectedRange?.from || !selectedRange?.to) return '';
    return `${('0' + selectedRange.from?.day).slice(-2) + '/' + ('0' + selectedRange.from?.month).slice(-2) + '/' + selectedRange.from?.year + ' - ' + ('0' + selectedRange.to?.day).slice(-2) + '/' + ('0' + selectedRange.to?.month).slice(-2) + '/' + selectedRange.to?.year}`;
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
      inputPlaceholder={`${moment().format("DD/MM/YYYY")} - ${moment().format("DD/MM/YYYY")}`}
      formatInputText={formatInputRange}
      inputClassName="!border-0 outline-none !bg-transparent !text-gray-400 !font-medium !text-xs !px-1" // custom class
      calendarClassName="responsive-calendar"
      shouldHighlightWeekends
      locale={CustomLocale}
    />
  );
};

export default DatePickerBI3;
