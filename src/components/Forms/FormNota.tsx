import { useAuthContext } from "@/contexts/AuthContext";
import React, { useState } from 'react'
import { IoMdPerson } from "react-icons/io";
import { IoClose, IoReaderOutline } from "react-icons/io5";

const FormNota = () => {
    const { setCodeNota, inputNota, setInputNota } = useAuthContext();
    const [] = useState("");

    const handleNota = (e: any) => {
        const value = e.target.value.toLowerCase();
        setInputNota(value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setCodeNota(inputNota);
    }

    const handleCleanNota = () => {
        setCodeNota("");
        setInputNota('');
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <input
                className="border w-full border-gray-300 rounded h-8 text-gray-500 text-sm placeholder:text-sm px-1 py-1"
                type="text"
                placeholder="Nota"
                onChange={handleNota}
                value={inputNota}
            />
            {inputNota && <IoClose onClick={handleCleanNota} className="absolute right-8 top-2 cursor-pointer text-gray-500" title="Limpar Nota Fiscal" />}
            <button
                type="submit"
            >
                <IoReaderOutline
                    size={22}
                    className="absolute right-2 top-1 cursor-pointer text-solar-wine-support"
                />
            </button>
        </form>
    )
}

export default FormNota