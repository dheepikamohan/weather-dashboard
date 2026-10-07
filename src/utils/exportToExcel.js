
// Exports the weather data to an .xlsx file with two sheets.
//npm install xlsx.

import * as XLSX from "xlsx";
/**
 * @param{string}city - eg "vasteras"
 * @param{object}daily  - open meteo daily object
 * @param{object}hourly  - open meteo hourly object(optiona)
  */

export function exportToExcel(city, daily , hourly) {

    // -----------sheet 1:7 day forecat-----------------------
    const dailyRows = daily.time.map((date , i) => ({
        Date: date,
        "Max temp (C)" : daily.temperature_2m_max?.[i],
         "Min temp (C)" : daily.temperature_2m_min?.[i],
         "Precipitation(mm)" : daily.precipitation_sum?.[i],
         "Wind max (m/s)": daily.wind_speed_10m_max?.[i],
        
        }));


const workbook = XLSX .utils.book_new();
const dailySheet = XLSX.utils.json_to_sheet(dailyRows);
dailySheet["!cols"] = [
    { wch: 12 },
    { wch: 14 },
    { wch: 14 },
    {wch: 18},
    {wch: 15},
];
XLSX.utils.book_append_sheet(workbook, dailySheet,"7-day forecat");

//-------sheet 2: 48 hour trend(only if hourly data exists----

if (hourly?.time?.length) {
    const now = new Date().toISOString().slice(0,13);
    const start = hourly.time.findIndex(t => t.slice(0,13) >= now);
    const hourlyRows = hourly.time.slice(start, start + 48).map((time , i) => ({
        Time: time.replace("T", " "),
        "Temperature (C)" : hourly.temperature_2m?.[start + i],
     }));

     const hourlySheet = XLSX.utils.json_to_sheet(hourlyRows);
     hourlySheet["!cols"] = [{  wch: 18 } ,{ wch: 18 }];
     XLSX.utils.book_append_sheet(workbook, hourlySheet, "48-hour trend");
     } 

     //-----file name : weather -vasteras -2026-09-07.xlsx----

     const today = new Date() .toISOString().slice(0, 10);
     const safeCity = city.replace (/[^a-zA-Z0-9]/g, "");
     XLSX.writeFile(workbook, `weather-${safeCity}-${today}.xlsx`);
    }