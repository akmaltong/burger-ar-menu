import QRCode from 'qrcode';

// Generate QR codes for menu items
const generateMenuQRs = async () => {
  const menuItems = [
    { id: 'classic_burger', data: 'burger_001' },
    { id: 'cheese_burger', data: 'burger_002' },
    { id: 'bacon_burger', data: 'burger_003' },
    { id: 'veggie_burger', data: 'burger_004' },
    { id: 'double_burger', data: 'burger_005' }
  ];

  const qrCodes = {};

  for (const item of menuItems) {
    try {
      const qrDataUrl = await QRCode.toDataURL(item.data, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      qrCodes[item.id] = qrDataUrl;
    } catch (err) {
      console.error(`Error generating QR for ${item.id}:`, err);
    }
  }

  return qrCodes;
};

// Save QR codes as images (for physical menu printing)
const saveQRCodeImages = async () => {
  const qrCodes = await generateMenuQRs();
  
  // In a real app, you'd save these to files or display them
  console.log('Generated QR Codes:');
  Object.entries(qrCodes).forEach(([id, dataUrl]) => {
    console.log(`${id}: ${dataUrl}`);
  });
  
  return qrCodes;
};

export { generateMenuQRs, saveQRCodeImages };