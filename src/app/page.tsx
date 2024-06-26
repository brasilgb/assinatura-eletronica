'use client'
import Pagination from "@/components/Pagination";
import SubBarTop from "@/components/SubBarTop";
import { useAuthContext } from "@/contexts/AuthContext";
import cailun from "@/services/cailun";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";

export default function Home() {
  const { filialDocs, assignStatus, assignType, dataInicial, dataFinal, selectedRange, codeCustomer, filterData } = useAuthContext();
  const [assignDocs, setAssignDocs] = useState<any>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<string>("");

  useEffect(() => {
    const getAssignDocs = async () => {
      await cailun.post('(WS_FILTER_SIGNATURES)', {

        "statuses": [
          {
            "status": assignStatus.statusa
          },
          {
            "status": assignStatus.statusb
          }
        ],
        "origin": filialDocs === null ? '' : filialDocs,
        "customerCode": codeCustomer,
        "startDate": selectedRange.from === null ? '' : moment(dataInicial).format('YYYY-MM-DD'),
        "endDate": selectedRange.to === null ? '' : moment(dataFinal).format('YYYY-MM-DD'),
        "type": assignType
      })
        .then((result) => {
          const { data } = result.data.response;
          setAssignDocs(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAssignDocs();
  }, [filialDocs, dataInicial, dataFinal, assignType, assignStatus, codeCustomer]);

  const unsecuredCopyToClipboard = (text: any) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy')
    } catch (err) {
      console.error('Unable to copy to clipboard', err)
    } document.body.removeChild(textArea)
  };

  const handleButtonLink = (link: string) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(link);
    } else {
      unsecuredCopyToClipboard(link);
    }
    setShowModal(true);
    setLinkCopied(link)
  }

  const ModalCopy = () => {
    return (
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-800 bg-opacity-10 flex items-center justify-center">
        <div className="w-1/3 bg-white rounded-md shadow-md p-1">
          <div className="p-2 text-solar-gray-light bg-solar-blue-primary rounded-t">Copiado</div>
          <div className="pt-4 px-2 bg-gray-100 text-lg text-center text-gray-600">Link copiado para a área de transferência</div>
          <div className="px-2 py-2 bg-gray-100 text-lg flex items justify-center text-gray-600">
            <div className="text-xs bg-gray-300 rounded py-0.5 px-1">{linkCopied}</div>
          </div>
          <div className="bg-gray-100 rounded-b flex items-center justify-center py-2 border-t">
            <button
              onClick={() => setShowModal(false)}
              className="text-sm text-solar-gray-light bg-solar-blue-primary py-1.5 px-4 rounded-md border-2 border-white shadow-md"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {showModal &&
        <ModalCopy />
      }
      <main className="container mx-auto">
        <div className="flex items-center justify-start py-4">
          <h1 className="text-xl text-solar-blue-secundary font-bold mr-2 uppercase">Assinatura eletrônica</h1>
          <span className="text-gray-500">-</span>
          <h1 className="text-lg text-gray-700 ml-2">acompanhe os status das assinaturas</h1>
        </div>
        <SubBarTop />
        <div className="mt-6 bg-gray-50 shadow rounded-md p-2 overflow-y-auto">

          <table className="table-auto w-full text-left text-gray-600 bg-solar-blue-secundary rounded-t-md">
            <tr className=" text-solar-gray-light">
              <th className="p-1">Código</th>
              <th className="p-1">Cliente</th>
              <th className="p-1">Filial</th>
              <th className="p-1">NF</th>
              <th className="p-1">Série</th>
              <th className="p-1">Data</th>
              <th className="p-1">Link</th>
              <th className="p-1">Tipo</th>
              <th className="p-1">Status</th>
              <th className="p-1"></th>
            </tr>
            {filterData?.map((doc: any, idx: number) => (
              <tr key={idx} className={`${idx < filterData.length - 1 && 'border-b border-gray-20'} ${idx % 2 > 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-pink-50`}>
                <td className="p-1">{doc?.customerCode}</td>
                <td className="p-1 text-sm font-bold">{doc?.customerName}</td>
                <td className="p-1">{doc.originNF}</td>
                <td className="p-1">{doc.numberNF}</td>
                <td className="p-1">{doc.serieNF}</td>
                <td className="p-1">{moment(doc.creationDate).format("DD/MM/YYYY")}</td>
                <td className="p-1">{doc.link}</td>
                <td className="p-1 text-solar-blue-secundary">{doc.type}</td>
                <td className="p-1 text-solar-green-primary">{doc.status}</td>
                <td>
                  <button
                    onClick={() => handleButtonLink(doc.link)}
                    title="Copiar link"
                    className="text-lg bg-solar-blue-primary text-gray-50 p-1 rounded shadow-md"
                  >
                    <IoCopy />
                  </button>
                </td>
              </tr>
            ))}
          </table>
          {assignDocs?.length > 15 &&
            <div className="py-8 pb-2">
              <Pagination data={assignDocs} />
            </div>
          }
        </div>
      </main>
    </>

  );
}