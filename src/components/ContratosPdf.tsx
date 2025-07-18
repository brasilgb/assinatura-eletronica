'use client'
import { FaFilePdf, FaXmark } from "react-icons/fa6";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";
import { useState } from "react";
import Loading from '@/components/Loading'

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        backgroundColor: "#ffffff",
        zIndex: 1000
    },
    header: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 10,
        marginBottom: 5,
        fontWeight: "bold",
    },
    section: {
        marginBottom: 10,
    },
    table: {
        display: "flex",
        width: "100%",
        borderStyle: "solid",
        borderColor: "#d3d3d3",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        marginBottom: 20
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCellHeader: {
        fontSize: 8,
        backgroundColor: "#f0f0f0",
        padding: 5,
        fontWeight: "bold",
        borderRightWidth: 1,
        borderColor: "#d3d3d3",
        flex: 1,
    },
    tableCellHeaderMin: {
        fontSize: 8,
        backgroundColor: "#f0f0f0",
        padding: 5,
        fontWeight: "bold",
        borderRightWidth: 1,
        borderColor: "#d3d3d3",
        width: 40,
    },
    tableCellHeaderMed: {
        fontSize: 8,
        backgroundColor: "#f0f0f0",
        padding: 4,
        fontWeight: "bold",
        borderRightWidth: 1,
        borderColor: "#d3d3d3",
        width: 70,
    },
    tableCell: {
        fontSize: 8,
        padding: 4,
        borderRightWidth: 1,
        borderColor: "#d3d3d3",
        flex: 1,
    },
    tableCellMin: {
        fontSize: 10,
        padding: 4,
        borderRightWidth: 1,
        borderColor: "#d3d3d3",
        width: 40,
    },
    tableCellMed: {
        fontSize: 10,
        padding: 4,
        borderRightWidth: 1,
        borderColor: "#d3d3d3",
        width: 70,
    },
    totalRow: {
        fontWeight: "bold",
        fontSize: 14,
    },
    footer: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 10,
        color: "#555",
    },
});


export default function ContratosPdf({ assignDocs }: any) {
    const [openPdf, setOpenPdf] = useState<boolean>(false);
    return (
        <>
            <div>
                <button
                    className="bg-red-600 rounded-md w-7 h-7 flex items-center justify-center shadow-sm"
                    onClick={() => setOpenPdf(true)}
                    title="Imprimir relatório"
                >
                    <FaFilePdf size={16} color="white" />
                </button>
            </div>
            {openPdf && !assignDocs && <Loading />}
            {openPdf && 
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-700 z-[1000]">
                    <button
                        onClick={() => setOpenPdf(false)}
                    >
                        <div className="w-10 h-10 bg-white flex items-center justify-center absolute top-16 right-80 rounded-full">
                            <FaXmark />
                        </div>
                    </button>
                    <PDFViewer width="100%" height="100%">
                        <Document>
                            <Page size="A4" orientation="portrait" style={styles.page}>
                                {/* Header */}
                                <View style={styles.header}>
                                    <Text style={styles.title}>Assinatura Eletrônica - Contratos</Text>
                                    <Text>Data: {new Date().toLocaleDateString()}</Text>
                                </View>

                                {/* Items Table */}
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCellHeaderMed}>Cód.Cli.</Text>
                                        <Text style={styles.tableCellHeader}>Cliente</Text>
                                        <Text style={styles.tableCellHeaderMin}>Filial</Text>
                                        <Text style={styles.tableCellHeaderMed}>NF</Text>
                                        <Text style={styles.tableCellHeaderMin}>Série</Text>
                                        <Text style={styles.tableCellHeaderMed}>Data</Text>
                                        <Text style={styles.tableCellHeaderMin}>Tipo</Text>
                                        <Text style={styles.tableCellHeaderMin}>Stat.</Text>
                                    </View>
                                    {assignDocs?.map((item: any, idx: number) => (
                                        <View key={idx} style={styles.tableRow}>
                                            <Text style={styles.tableCellMed}>{item.customerCode}</Text>
                                            <Text style={styles.tableCell}>{item.customerName}</Text>
                                            <Text style={styles.tableCellMin}>{item.originNF}</Text>
                                            <Text style={styles.tableCellMed}>{item.numberNF}</Text>
                                            <Text style={styles.tableCellMin}>{item.serieNF}</Text>
                                            <Text style={styles.tableCellMed}>{item.creationDate}</Text>
                                            <Text style={styles.tableCellMin}>{item.type}</Text>
                                            <Text style={styles.tableCellMin}>{item.status}</Text>
                                        </View>
                                    ))}
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                </div>
            }
        </>
    )
};