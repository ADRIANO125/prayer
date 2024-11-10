import React, { useEffect, useState } from "react";
import Prayer from "./Components/Prayer";

function App() {

const[PrayerTimings , setPrayerTimings] = useState({})
const[ PrayerDate , setPrayerDate ] = useState("")
const[ city , setCity ] = useState("Cairo")



  var cities =[
    {name:"القاهرة",value: "Cairo"},
    {name:"الإسكندرية",value: "Alexandria"},
    {name:"الإسماعيلية",value: "Ismailia"},
    {name:"السويس",value: "Suez"},
    {name:"المنصورة",value: "Mansoura"},
    {name:"الجيزة",value: "Giza"},
    {name:"الشرقية",value: "Sharqia"},
    {name:"أسيوط",value: "Asyut"},
    {name:"سوهاج",value: "Sohag"},
    {name:"أسيوط",value: "Asyut"},
    {name:"المنيا",value: "Minya"}
  ]

  
  


  useEffect(()=>{
    var FetchPrayerTimings =async () => {
      try{
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/10-11-2024?city=Eg&country=${city}`)
        const data_prayer = await response.json();


        setPrayerTimings(data_prayer.data.timings)
        setPrayerDate(data_prayer.data.date.gregorian.date)
        console.log(data_prayer);
        

      }
      catch(error){
        console.error(error)
      }
    }

    FetchPrayerTimings()

  },[city]);


  const FormatTimes = (time) => {
    if (!time) {
      return "00:00";
    }
    
    const [hours, minutes] = time.split(":").map(Number);
    const formattedHours = hours % 12 || 12; 
    const period = hours >= 12 ? "PM" : "AM";
    
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };



  return (
    <section>
      <div className="container">
        <div className="top-section">
          <div className="city">
            <h2>المدينه</h2>
            <select onChange={(e)=>{
              setCity(e.target.value)
            }}>
              {cities.map((city_obj)=>(
                <option key={city_obj.value} value={city_obj.value} > {city_obj.name} </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h2>التاريخ</h2>
            <h4>{PrayerDate}</h4>
          </div>
        </div>
        {/* prayer cart  */}
        <Prayer name= " الفجر " time={ FormatTimes (PrayerTimings.Fajr)} />
        <Prayer name= " الضهر " time={ FormatTimes (PrayerTimings.Dhuhr)}/>
        <Prayer name= " العصر " time={ FormatTimes (PrayerTimings.Asr)}/>
        <Prayer name= " المغرب " time={ FormatTimes (PrayerTimings.Maghrib)}/>
        <Prayer name= " العشاء " time={ FormatTimes (PrayerTimings.Isha)}/>
      </div>
    </section>
  );
}

export default App ;
