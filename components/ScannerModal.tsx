import React, { useEffect, useRef, useState } from 'react';

interface ScannerModalProps {
  onClose: () => void;
  onBarcodeScan: (value: string) => void;
}

const ScannerModal: React.FC<ScannerModalProps> = ({ onClose, onBarcodeScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!('BarcodeDetector' in window)) {
      setError('Barcode detection not supported.');
      return;
    }

    const barcodeDetector = new (window as any).BarcodeDetector({
      formats: ['qr_code', 'ean_13', 'codabar', 'code_128', 'upc_a', 'upc_e'],
    });

    let scanInterval: number;

    const startScan = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        scanInterval = window.setInterval(async () => {
          if (!videoRef.current || videoRef.current.readyState < 2) return;
          try {
            const barcodes = await barcodeDetector.detect(videoRef.current);
            if (barcodes.length > 0 && barcodes[0].rawValue) {
              clearInterval(scanInterval);
              onBarcodeScan(barcodes[0].rawValue);
            }
          } catch (e) { /* ignore detection errors */ }
        }, 300);

      } catch (err) {
        console.error('Camera error:', err);
        setError('CAMERA ACCESS ERROR. Check permissions.');
      }
    };

    startScan();

    return () => {
      clearInterval(scanInterval);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [onBarcodeScan]);
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-crt-flicker"
      onClick={onClose}
    >
      <div
        className="bg-crt-bg border-4 border-crt-blue/80 p-6 m-4 max-w-lg w-full"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl text-crt-blue-dark mb-4 text-center">SCAN BARCODE</h2>
        <div className="bg-black border-2 border-crt-blue/50 w-full aspect-video relative">
            <video ref={videoRef} className="w-full h-full object-cover" playsInline />
            <div className="absolute inset-0 border-4 border-crt-blue/50 m-4 pointer-events-none animate-pulse"></div>
        </div>
        
        {error ? (
          <p className="text-red-500 text-center text-xl mt-4">{error}</p>
        ) : (
          <p className="text-crt-blue text-center text-xl mt-4">
            ALIGN BARCODE WITHIN FRAME...
          </p>
        )}

        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-transparent hover:bg-crt-blue/20 text-crt-blue font-bold py-2 px-4 border-2 border-crt-blue/70"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScannerModal;