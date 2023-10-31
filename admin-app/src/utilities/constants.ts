import moment from "moment";
interface yearOptionsInterface {
    value: string
    name: string
}
const generateYearOptions = (): yearOptionsInterface[] => {
    let data: yearOptionsInterface[] = [];
    for (let date: number = 1990; date <= new Date().getFullYear(); date++) {
        data.push({ value: date.toString(), name: date.toString() })
    }
    return data;
}

export const yearOptions: yearOptionsInterface[] = generateYearOptions()
export const similarCarOptions = [
    { value: 0, name: 'Redesigned' },
    { value: 1, name: 'Customized' },
    { value: 2, name: 'Hybrid' },
]
export const agencyOptions = [
    { value: 0, name: 'O-car Building' },
    { value: 1, name: 'A-car Building' },
]
export const brandOptions = [
    { value: 'bmw', name: 'BMW' },
    { value: 'benz', name: 'BENZ' },
]
export const purposeOptions = [
    { value: 0, name: 'Selling' },
    { value: 1, name: 'Rent' },
]
export const availableOptions = [
    { value: true, name: 'Published' },
    { value: false, name: 'UnPublished' },
]
export const IMAGE_ACCEPT = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
}
export const DOCUMENT_ACCEPT = '.pdf'

export enum CategoryStanding {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}

export interface CheckData {
    id: number
    label: string
    checked: boolean
    hasSimilarCar: boolean
}

export interface SelectOptionInterface {
    label: string
    value: number
    mainImage?: any
    image?: any
}

export interface OptionInterface {
    label: string
    value: string
}

export const API_SERVER = "https://api.6tims.com/";
export const API_FILE_URL = "https://api.6tims.com/public/files";

export const toHHMMSS = (duration: any) => {
    var sec_num = parseInt(duration, 10);
    var hours = Math.floor(sec_num / 3600).toString();
    var minutes = Math.floor((sec_num - (parseFloat(hours) * 3600)) / 60).toString();
    var seconds = (sec_num - (parseFloat(hours) * 3600) - (parseFloat(minutes) * 60)).toString();
  
    if (parseFloat(hours) < 10) { hours = "0" + hours; }
    if (parseFloat(minutes) < 10) { minutes = "0" + minutes; }
    if (parseFloat(seconds) < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
  }
  export const formatDuration = (duration: any) => {
    let d = ""
    duration >= 3600
      ? d = `${moment.utc(duration * 1000).format('H:mm:ss')}`
      : d = `${moment.utc(duration * 1000).format('mm:ss')}`
    return d
  }

  export const calcReadingDuration = (content: any) => {
    let reading_duration = 0;
    const average_seconds_per_word = 0.266 * 2;
    let parser = new DOMParser();
    let doc = parser.parseFromString(content, "text/html");
    let words = doc.body.textContent || "";

    reading_duration += words.split(" ").length * average_seconds_per_word;
    return (reading_duration / 60 + 1).toFixed(0);
}

export function dateToLocalString(msDate: number) {
    const _thisDate = new Date(msDate) 
    return _thisDate.toLocaleString()
}

export function hasSpecialChar(str: string) {
    return ( /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str));
}

export const randomChar= (length: number) => {
    var date = new Date ().getTime();
  
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + date;
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
     }
     return result;
  }