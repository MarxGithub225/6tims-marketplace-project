import { useCallback, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import PageHeader from "../../PageHeader";
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { config } from '../../../utilities/helper';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
'pdfjs-dist/build/pdf.worker.min.js',
import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
  };
  
  const resizeObserverOptions = {};
  
  const maxWidth = 800;
  
  type PDFFile = string | File | null;

function ShippingAndReturns() {
    const [file, setFile] = useState<PDFFile>('./docs/shipping-and-retourns.pdf');
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries: any) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }
  return <>
    <PageHeader
    header="Expéditions, Livraisons et Retours"
    />
    <div className="w-full flex justify-center">
        <div className="Example__container__document" ref={setContainerRef}>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
                <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                />
            ))}
            </Document>
        </div>
    </div>
  </>;
}

export default ShippingAndReturns;
