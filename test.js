import jpeg from "jpeg-js";
import * as fs from 'node:fs';
import {
    MultiFormatReader,
    BarcodeFormat,
    DecodeHintType,
    RGBLuminanceSource,
    BinaryBitmap,
    HybridBinarizer
} from '@zxing/library';


var jpegData = fs.readFileSync('test.jpg');
var rawImageData = jpeg.decode(jpegData);

const hints = new Map();
const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX];
      
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
hints.set(DecodeHintType.TRY_HARDER, true);



const reader = new MultiFormatReader();

reader.setHints(hints);

const len = rawImageData.width * rawImageData.height;
  
  const luminancesUint8Array = new Uint8ClampedArray(len);
  
  for(let i = 0; i < len; i++){
    luminancesUint8Array[i] = ((rawImageData.data[i*4]+rawImageData.data[i*4+1]*2+rawImageData.data[i*4+2]) / 4) & 0xFF;
  }
  
const luminanceSource = new RGBLuminanceSource(luminancesUint8Array, rawImageData.width, rawImageData.height);
  

  
  const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
  
  
  const qrCode = reader.decode(binaryBitmap);
  
  console.log( JSON.stringify(qrCode.text));

