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
        justifyContent: 'space-beetwen'
    },
    title: {
        fontSize: 14,
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
        borderWidth: 1,
        borderColor: "#d3d3d3",
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCellHeader: {
        backgroundColor: "#f0f0f0",
        padding: 5,
        fontWeight: "bold",
        borderRightWidth: 1,
        borderColor: "#d3d3d3",
        flex: 1,
    },
    tableCell: {
        padding: 5,
        borderRightWidth: 1,
        borderColor: "#d3d3d3",
        flex: 1,
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
    const [openPdf, setOpenPdf] = useState<boolean>(true);

    return (
        <>
            <div>
                <button
                    onClick={() => setOpenPdf(true)}
                >
                    <FaFilePdf />
                </button>
            </div>
            {openPdf && assignDocs &&
                <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-700 z-[1000]">
                    <button
                        onClick={() => setOpenPdf(false)}
                    >
                        <div className="w-10 h-10 bg-white flex items-center justify-center absolute top-20 right-96 rounded-full">
                            <FaXmark />
                        </div>
                    </button>
                    <PDFViewer width="100%" height="100%">
                        <Document>
                            <Page size="A4" style={styles.page}>
                                {/* Header */}
                                <View style={styles.header}>
                                    <Text style={styles.title}>Assinatura Eletrônica - Contratos</Text>
                                    <Text>Data: {new Date().toLocaleDateString()}</Text>
                                </View>

                                {/* Items Table */}
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCellHeader}>Item</Text>
                                        <Text style={styles.tableCellHeader}>Quantity</Text>
                                        <Text style={styles.tableCellHeader}>Unit Price</Text>
                                        <Text style={styles.tableCellHeader}>Total</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCell}>Service A</Text>
                                        <Text style={styles.tableCell}>1</Text>
                                        <Text style={styles.tableCell}>$100.00</Text>
                                        <Text style={styles.tableCell}>$100.00</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCell}>Service B</Text>
                                        <Text style={styles.tableCell}>2</Text>
                                        <Text style={styles.tableCell}>$50.00</Text>
                                        <Text style={styles.tableCell}>$100.00</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCell}>Product X</Text>
                                        <Text style={styles.tableCell}>1</Text>
                                        <Text style={styles.tableCell}>$200.00</Text>
                                        <Text style={styles.tableCell}>$200.00</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={[styles.tableCell, styles.totalRow]}>Total</Text>
                                        <Text style={[styles.tableCell, styles.totalRow]}></Text>
                                        <Text style={[styles.tableCell, styles.totalRow]}></Text>
                                        <Text style={[styles.tableCell, styles.totalRow]}>$400.00</Text>
                                    </View>
                                </View>

                                {/* Footer */}
                                <View style={styles.footer}>
                                    <Text>Thank you for your business!</Text>
                                    <Text>If you have any questions, contact us at email@example.com</Text>
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                </div>
            }
        </>
    )
};