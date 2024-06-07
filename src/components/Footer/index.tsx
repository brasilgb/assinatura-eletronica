import moment from "moment";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="flex items-center justify-center py-0.5 bg-solar-blue-secundary">
      <p className="md:text-xs text-[8px] text-solar-gray-light">
        &copy; {moment().format("YYYY")} Solar Comércio e Agroindústria Ltda.
      </p>
    </footer>
  );
};

export default Footer;
