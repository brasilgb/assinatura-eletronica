'use client'
import Loading from "@/components/Loading";
import SubBarTop from "@/components/SubBarTop";
import { useAuthContext } from "@/contexts/AuthContext";
import cailun from "@/services/cailun";
import moment from "moment";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { IoCopy } from "react-icons/io5";

export default function Home() {
  const { filialDocs, assignStatus, assignType, dataInicial, dataFinal, selectedRange, codeCustomer, codeNota, assignDocs, setAssignDocs } = useAuthContext();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<string>("");

  useEffect(() => {
    const getAssignDocs = async () => {
      setShowLoading(true);
      await cailun.post('(WS_FILTER_SIGNATURES)', {

        "statuses": [
          {
            "status": assignStatus.statusa
          },
          {
            "status": assignStatus.statusb
          }
        ],
        "origin": filialDocs,
        "invoice": codeNota,
        "customerCode": codeCustomer,
        "startDate": selectedRange.from === null ? '' : moment(dataInicial).format('YYYY-MM-DD'),
        "endDate": selectedRange.to === null ? '' : moment(dataFinal).format('YYYY-MM-DD'),
        "type": assignType
      })
        .then((result) => {
          const { data } = result.data.response;
          setShowLoading(false);
          setAssignDocs(data.sort((a: any, b: any) => (a.creationDate < b.creationDate ? 1 : -1)));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAssignDocs();
  }, [filialDocs, dataInicial, dataFinal, assignType, assignStatus, codeCustomer, setAssignDocs, codeNota]);

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
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-800 bg-opacity-10 flex items-center justify-center z-50">
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

  const columns:any = [
    {
      id: 1,
      name: 'Código',
      selector: (row: any) => row.customerCode,
      sortable: true,
      width: '100px'
    },
    {
      id: 2,
      name: 'Cliente',
      selector: (row: any) => row.customerName,
      sortable: true,
      width: '300px'
    },
    {
      id: 3,
      name: 'Filial',
      selector: (row: any) => row.originNF,
      sortable: true,
      width: '80px'
    },
    {
      id: 4,
      name: 'NF',
      selector: (row: any) => row.numberNF,
      sortable: true,
      width: '100px'
    },
    {
      id: 5,
      name: 'Série',
      selector: (row: any) => row.serieNF,
      sortable: true,
      width: '100px'
    },
    {
      id: 6,
      name: 'Data',
      selector: (row: any) => moment(row.creationDate).format("DD/MM/YYYY"),
      sortable: true,
      width: '150px'
    },
    {
      id: 7,
      name: 'Link',
      selector: (row: any) => row.link
    },
    {
      id: 8,
      name: 'Tipo',
      selector: (row: any) => <span className="p-1 text-solar-blue-secundary text-base font-medium">{row.type}</span>,
      width: '60px'
    },
    {
      id: 9,
      name: 'Status',
      selector: (row: any) => <span className="p-1 text-solar-green-primary text-base font-medium">{row.status}</span>,
      width: '80px'
    },
    {
      name: '',
      selector: (row: any) => <button
        onClick={() => handleButtonLink(row.link)}
        title="Copiar link"
        className="text-lg bg-solar-blue-primary text-gray-50 p-1 rounded shadow-md"
      >
        <IoCopy />
      </button>,
      width: '60px'
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: 'Linhas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#0d3b85",
        color: "white",
        fontSize: "14px"
      },
    },
  };

  return (
    <>
      {showModal &&
        <ModalCopy />
      }
      {showLoading &&
        <Loading />
      }
      <main className="container mx-auto">
        <div className="flex items-center justify-start py-4">
          <h1 className="text-xl text-solar-blue-secundary font-bold mr-2 uppercase">Assinatura eletrônica</h1>
          <span className="text-gray-500">-</span>
          <h1 className="text-lg text-gray-700 ml-2">acompanhe os status das assinaturas</h1>
        </div>
        <SubBarTop />
        <div className={`mt-2 bg-gray-50 shadow rounded-md p-2`}>

          <DataTable
            columns={columns}
            data={assignDocs}
            pagination
            striped
            paginationComponentOptions={paginationComponentOptions}
            customStyles={customStyles}
            highlightOnHover={true}
            paginationPerPage={12}
            paginationRowsPerPageOptions={[12, 20, 25, 30]}
          />
        </div>
      </main>
    </>

  );
}