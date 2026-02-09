import React, { useRef, useEffect, useState } from 'react';
import jsQR from 'jsqr';

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
          setIsScanning(true);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let scanInterval;

    if (isScanning && videoRef.current && canvasRef.current) {
      const scanFrame = () => {
        if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });
          
          if (code) {
            setScanResult(code.data);
            onScan(code.data);
            setIsScanning(false);
          }
        }
        
        scanInterval = requestAnimationFrame(scanFrame);
      };
      
      scanInterval = requestAnimationFrame(scanFrame);
    }

    return () => {
      if (scanInterval) {
        cancelAnimationFrame(scanInterval);
      }
    };
  }, [isScanning, onScan]);

  const restartScanning = () => {
    setScanResult(null);
    setIsScanning(true);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ display: 'none' }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {/* Scanner Overlay */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '250px',
        height: '250px',
        border: '3px solid #fff',
        borderRadius: '15px',
        boxShadow: '0 0 0 100vmax rgba(0,0,0,0.5)',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '-3px',
          left: '-3px',
          width: '30px',
          height: '30px',
          borderTop: '3px solid #ff6b6b',
          borderLeft: '3px solid #ff6b6b',
          borderRadius: '15px 0 0 0'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '-3px',
          right: '-3px',
          width: '30px',
          height: '30px',
          borderTop: '3px solid #ff6b6b',
          borderRight: '3px solid #ff6b6b',
          borderRadius: '0 15px 0 0'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-3px',
          left: '-3px',
          width: '30px',
          height: '30px',
          borderBottom: '3px solid #ff6b6b',
          borderLeft: '3px solid #ff6b6b',
          borderRadius: '0 0 0 15px'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-3px',
          right: '-3px',
          width: '30px',
          height: '30px',
          borderBottom: '3px solid #ff6b6b',
          borderRight: '3px solid #ff6b6b',
          borderRadius: '0 0 15px 0'
        }}></div>
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '15px 25px',
        borderRadius: '10px',
        maxWidth: '80%'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
          {scanResult ? '✅ Успешно отсканировано!' : '📱 Наведите камеру на QR-код'}
        </h3>
        <p style={{ margin: '0', fontSize: '14px' }}>
          {scanResult 
            ? `Найдено: ${scanResult}` 
            : 'Выровняйте QR-код в рамках для сканирования'
          }
        </p>
        {scanResult && (
          <button 
            onClick={restartScanning}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Сканировать другой код
          </button>
        )}
      </div>
    </div>
  );
};

export default QRScanner;