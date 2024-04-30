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
  const { dataFiltro, setDataInicial, dataInicial, setDataFinal, dataFinal } = useAuthContext();

  const [selectedRange, setSelectedRange] = useState<DayRange>({
    from: {
      year: parseInt(moment(dataInicial).format("YYYY")),
      month: parseInt(moment(dataInicial).format("MM")),
      day: parseInt(moment(dataInicial).format("DD")),
    },
    to: {
      year: parseInt(moment(dataFinal).format("YYYY")),
      month: parseInt(moment(dataFinal).format("MM")),
      day: parseInt(moment(dataFinal).format("DD")),
    },
  });

  const formatInputRange = () => {
    if (!selectedRange) return "";
    return `${("0" + selectedRange.from?.day).slice(-2) + "/" + ("0" + selectedRange.from?.month).slice(-2) + "/" + selectedRange.from?.year + " - " + ("0" + selectedRange.to?.day).slice(-2) + "/" + ("0" + selectedRange.to?.month).slice(-2) + "/" + selectedRange.to?.year}`;
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
