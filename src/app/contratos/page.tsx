
'use client'
import ContratosPdf from '@/components/ContratosPdf'
import { useAuthContext } from '@/contexts/AuthContext'
import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'

export default function page() {
  const { assignDocs} = useAuthContext();
  return (
    <PDFViewer width="100%" height="100%" >
      <ContratosPdf assignDocs={assignDocs} />
    </PDFViewer>
  )
};
