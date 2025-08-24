// import crypto from 'crypto'; // for HashService
// import xmlConverter from "xml-js"; // https://www.npmjs.com/package/xml-js
// import bcrypt from "bcrypt";
import appConfig from "@/configs/app.config";
const saltRounds = 12; // độ phức tạp khi hash text

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

export const clog = function (...data:unknown[]) {
    // console.log('🛠️ >> appConfig >>', appConfig);
    let debug = appConfig.isDebug,
     logging = appConfig.isLogging;
    let isLogging = false;
    if (debug === true || logging === true) isLogging = true;
    if (isLogging) {
        // console.log('🛠️ >>',...data);
        console.log(...data);
    }
}
