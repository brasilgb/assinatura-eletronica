import { useAuthContext } from "@/contexts/AuthContext";
import moment from "moment";
import React, { useEffect, useState } from 'react'
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IoCopy } from "react-icons/io5";
import ReactPaginate from "react-paginate";

interface PaginationProps {
    data: any;
}

const Pagination = ({ data }: PaginationProps) => {
    const { setFilterData } = useAuthContext();
    const [page, setPage] = useState(0);
    const n = 15;
    useEffect(() => {
        setFilterData(
            data?.filter((item: any, index: number) => {
                return (index >= page * n) && (index < (page + 1) * n);
            })
        );
    }, [page, data]);

    return (
        <ReactPaginate
            containerClassName={"bg-gray-50 flex items-center justify-end gap-4 text-gray-400"}
            pageClassName={"flex items-center justify-center hover:text-solar-blue-primary font-semibold"}
            activeClassName={"bg-solar-blue-primary text-gray-50 hover:text-gray-50 rounded-full h-8 w-8"}
            onPageChange={(event) => setPage(event.selected)}
            pageCount={Math.ceil(data?.length / n)}
            breakLabel="..."
            previousLabel={
                <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                    <AiFillLeftCircle />
                </IconContext.Provider>
            }
            nextLabel={
                <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                    <AiFillRightCircle />
                </IconContext.Provider>
            }
        />
    )
}

export default Pagination