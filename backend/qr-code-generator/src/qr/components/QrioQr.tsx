import React, {useState, useRef, useEffect} from 'react';
import QRCode from 'qrcode.react';
import {toPng} from 'html-to-image';

declare type ImageSettings = {
  src: string;
  x?: number;
  y?: number;
  height: number;
  width: number;
  excavate: boolean;
}

declare type QrioQrProps = {
  url: string;
  getQR: (base64String: string) => void;
  imageSettings?: ImageSettings;
  size?: number
}

const QrioQr: React.FC<QrioQrProps> = ({url, getQR, imageSettings, size}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<string>('');

  useEffect(() => {
    setData(url);
  }, [url]);

  const downloadQRCode = () => {
    if (qrCodeRef.current !== null) {
      toPng(qrCodeRef.current)
          .then(function (dataUrl) {
            getQR(dataUrl);
          })
          .catch(function (error) {
            console.error('Error: ', error);
          });
    }
  };

  return (
      <div>
        {data && (
            <div
                style={{
                  margin: 20,
                  backgroundColor: 'white',
                  display: 'inline-block',
                  border: '1px solid black',
                  padding: '10px',
                }}
                ref={qrCodeRef}
            ><QRCode imageSettings={imageSettings} value={data} size={size}/>
            </div>
        )}
        <button style={{marginTop: 10}} onClick={downloadQRCode}>Download QR Code</button>
      </div>
  );
};

export default {QrioQr};
