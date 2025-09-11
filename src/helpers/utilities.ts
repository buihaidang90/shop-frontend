// import crypto from 'crypto'; // for HashService
// import xmlConverter from 'xml-js'; // https://www.npmjs.com/package/xml-js
// import bcrypt from 'bcrypt';
import appConfig from '@/configs/app.config';
// import { dirname } from 'node:path'
// import { fileURLToPath } from 'node:url'
// import fs from 'node:fs'
// import path from 'path'

const saltRounds = 12; // độ phức tạp khi hash text
// const __dirname = dirname(fileURLToPath(import.meta.url))

export const clog = function (...data: unknown[]) {
  // console.log('🛠️ >> appConfig >>', appConfig);
  let debug = appConfig.isDebug,
    logging = appConfig.isLogging;
  let isLogging = false;
  if (debug === true || logging === true) isLogging = true;
  if (isLogging) {
    // console.log('🛠️ >>',...data);
    console.log(...data);
  }
};

// export const xmlToJson = function (xmlString:string, compact:boolean=true):object{
//     // console.log('🛠️ >> compact >>',compact);
//     let options = {compact: compact, spaces: 4};

//     // Convert XML to JSON object
//     let result = xmlConverter.xml2js(xmlString, options);

//     return result;
// };

// export const jsonToXml = function (jsonObject:object, compact:boolean=true):string{
//     // console.log('🛠️ >> compact >>',compact);
//     let options = {compact: true, ignoreComment: compact, spaces: 4};

//     // Convert JSON object to XML
//     let result = xmlConverter.js2xml(jsonObject, options);

//     return result;
// };

// export const hashText = async function (plainText:string):Promise<string> {
//     // console.log('🛠️ >> hashText >> plainText >>',plainText);
//     return await bcrypt.hash(plainText, saltRounds);
//     // try {
//     // } catch (error) {
//     //     console.log('🛠️ >> hashText >> error >>',plainText);
//     // }
// }

// export const compareHashed = async function (data:string, encrypted:string):Promise<boolean> {
//     return await bcrypt.compare(data, encrypted);
// }

// export const generateMd5 = function (inputString:string):string {
//     /*
//     createHash('md5'); // Create an MD5 hash object.
//     update(inputString): Update the hash object with the input data.
//     digest('hex'): method calculates the final hash.
//     You can specify the encoding (e.g., 'hex', 'base64').
//     */
//     const hash = crypto.createHash('md5').update(inputString).digest('hex');
//     // console.log('🛠️ >> generateMd5 >> ', hash);
//     return hash.toUpperCase(); // = select convert(varchar(32), hashbytes('MD5', inputString), 2)
// };

// export const generateSha256 = function (inputString:string):string {
//     /*
//     createHash('md5'); // Create an MD5 hash object.
//     update(inputString): Update the hash object with the input data.
//     digest('hex'): method calculates the final hash.
//     You can specify the encoding (e.g., 'hex', 'base64').
//     */
//     const hash = crypto.createHash('sha256').update(inputString, 'utf8').digest('hex');
//     // utiCls.clog('🛠️ >> generateSha256 >> ', hash);
//     return hash.toUpperCase(); // = select convert(varchar(64), hashbytes('SHA2_256', inputString), 2)
// }

export const getImageUrl = function (
  fileName: string,
  ext: string | null
) {
  // Mục tiêu: lấy đường dẫn đến file: public/images/no-img-ava.jpg
  let nameWithExt = '',
    _ext = '';
  if (typeof ext !== 'undefined' && ext?.trim() !== '') _ext = ext ?? '';
  nameWithExt = fileName + (_ext === '' ? '' : `.${ext}`);
  let imgUrl = `./images/${nameWithExt}`;
  // clog('🛠️ >> imgUrl >>', imgUrl);
  return imgUrl;
  // https://medium.com/@andrewmasonmedia/how-to-use-images-with-vite-and-vue-937307a150c0
};

//export const isEmptyObject = (obj:object | null) => {
//   if (!obj || obj === null || isUndefined(obj)) return true;
//   for (const prop in obj) {
//     if (Object.hasOwn(obj, prop)) {
//       return false;
//     }
//   }
//   return true;
// };

export const isUndefined = (arg: any) => {
  let r = (typeof arg === "undefined");
  return r;
}

export const findElement = (sourceArr: Array<any>, keyStr: string, value: any) => {
  try {
    let ind = sourceArr.findIndex((item) => item[keyStr] === value);
    // clog('🛠️ >> findElement >> ind >>', ind);
    if (ind > -1) {
      // clog('🛠️ >> findElement >> el >>', sourceArr[ind]);
      return sourceArr[ind];
    }
    return null;
  }
  catch (error) {
    clog('🛠️ >> findElement >> error >>', error);
    return null;
  }
}

export const formatNumber = (input: number) => {
  // clog('🛠️ >> formatNumber >> input >>', input);
  if (!input) return "";
  if (input.toString() == "") return "";
  if (typeof input === "undefined") return "";
  //if (inputect.prototype.toString.call(input) !== "[inputect Number]") return "";

  let defined = {
    decimal: ',', // session.numDecimalSeparator,
    thousand: '.', // session.numThousandSeparator,
    transChar: "_",
  };

  try {
    let output = Intl.NumberFormat("vi").format(input); // => ex: '1.234.567,89'
    // or using regex
    output = output.replace('/,/g', defined.transChar);
    output = output.replace('/./g', defined.thousand);
    output = output.replace(`${defined.transChar}/g`, defined.decimal);

    // or using replaceAll
    // output = output.replaceAll(',', defined.transChar);
    // output = output.replaceAll('.', defined.thousand);
    // output = output.replaceAll(defined.transChar, defined.decimal);

    // clog('🛠️ >> formatNumber >> output >>', output);
    return output;
  }
  catch (error) {
    clog('🛠️ >> findElement >> error >>', error);
    return input.toString();
  }
};

//export const formatDate = (obj) => {
//   //cLog("formatDate >> obj=", obj);
//   if (!obj) return "";
//   if (obj.toString() == "") return "";
//   if (typeof obj === "undefined") return "";
//   //if (Object.prototype.toString.call(obj) !== "[object Date]") return "";

//   try {
//     let _format = session.dateShortFormat;
//     let _date = new Date(obj);
//     //cLog("formatDate >> _date >>", _date);

//     let _output = "";
//     //_output = DateTime.fromJSDate(obj).toLocaleString(_format);
//     //if (DateTime.fromJSDate(_date ?? '', 'yyyyMMdd').isValid)
//     _output = DateTime.fromJSDate(_date ?? '', 'yyyyMMdd').toFormat(_format);
//     //cLog("formatDate >> _date >> luxon >>", _output;

//     //_output = dayjs.locale("ja"); //dayjs
//     //_output = dayjs(_date).format("L");
//     //_output = dayjs(_date).format("dd/MM/yyyy");
//     //_output = dayjs(_date).format(_format.toUpperCase());
//     //cLog("formatDate >> _date >> dayjs >>", _output);

//     //_output = _date.toLocaleString("vi"); //js
//     //_output = _date.toLocaleDateString("ja", {
//     //  weekday: "long",
//     //  year: "numeric",
//     //  month: "numeric",
//     //  month: "long",
//     //  day: "numeric",
//     //}, //=> en=18.02.2025, vi=18/02/2025, ja=2025/02/18)
//     //);

//     return _output;
//   }
//   catch (error) {
//     cLog("formatDate >> error >>", error);
//     return obj.toString();
//   }
// };

export const isEmptyObject = (obj:object | null) => {
  if (!obj || obj === null || isUndefined(obj)) return true;
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
};
