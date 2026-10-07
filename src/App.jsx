import{ useState,useEffect} from "react";
import Forecast from "./components/Forecast"; 
import { themes } from './theme';
import TrendChart from "./components/TrendChart";
import { exportToExcel } from "./utils/exportToExcel";
import cloudy from "./assets/cloudy.png";


    

    const cities = [
        {name: "Stockholm", lat:59.33, lon:18.07, color:"#006AA7" },
        {name: "Berlin", lat:52.52, lon:13.41, color:"#3a3a3a" },
        {name: "Rome", lat:41.90, lon:12.50, color:"#008C45" },
        {name: "Oslo", lat:59.91, lon:10.75, color:"#BA0C2F" },
        {name: "Warsaw", lat:52.23, lon:21.01, color:"#DC143670" },
        {name: "Helsinki", lat:60.17, lon:24.94, color:"#002F6C" },

   ];

export default function App() {

    const [weather, setWeather] = useState(null);
    const [selectedCity, setSelectedCity] = useState(cities[0]);
    const [mode,setMode] = useState(()  => localStorage.getItem('theme') ||  'light');
    const [fullData,setFullData]=useState(null);
    const theme = themes[mode];
    useEffect(()=> {

      localStorage.setItem('theme', mode);
      document.body.style.background= theme.bg
      document.body.style.margin = '0';
      document.body.style.transition = 'background 0.25';

    },[mode, theme]);

    const getWeather = async (city) => {

      try{ 

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m &hourly=temperature_2m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto`);

        const data = await response.json();

        console.log(data);

        setWeather(data.current);
        setFullData(data);
        setSelectedCity(city);



    } catch (error) {

      console .error(error);

      alert("Error loading weather");
    }
  };

    return (

        <div style ={{ padding: "40px",  fontFamily: "sans-serif", background: theme.bg,color:theme.text, minHeight: "100vh",transition:"background 0.3s"}}>
          <img src={cloudy} alt="cloudy" style={{width: "80px"}} />

            <h1 style ={{ color: theme.text,fontSize:"28px", textAlign:"center"}}>Nordic Weather Dashboard</h1>

           <div style ={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent:"flex-start", paddingLeft: "123px" }}>
            {cities.map((city)=> (
                  <button 
                      key ={city.name}
                      onClick={() => getWeather(city)}
                      style={{
                        padding: "10px 16px",
                        backgroundColor: city.color,
                        color:"white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      >
                        {city.name}

                      </button>

            ))}
           <Forecast />

           </div>

            {weather && (
              <>

              <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                style={{
                  width : '60px',
                  height:'30px',
                  background: mode === 'dark' ? '#334155' : '#87ceeb' ,
                  color: theme.text,
                  border: `1px solid ${theme.border}`, 
                  borderRadius: '15px',
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: '14px',
                  position: 'relative',
                }}
                >
                  <span
                  style={{
                  width : '24px',
                  height:'24px',
                  background: '#fff',
                  transition: 'left 0.25s',
                  
                  border: `1px solid ${theme.border}`, 
                  borderRadius: '50%',
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: '16px',
                  position: 'absolute',
                  top:'2px',
                  left: mode === 'dark'? '32px' : '2px',
                  lineHeight:'24px',
                  textAlign:'center',
                }}
                >


         {mode ===  'light' ? '🌞' :'🌙'}
         </span>
                </button>

            <div style ={{marginTop: "20px" , textAlign: "center"}}>

                <h2 style={{color: selectedCity.color}}> {selectedCity.name} -Weather Conditions</h2>
                <table style ={{ borderCollapse: "collapse",color: theme.text, width :"320px", margin: "0 auto", borderRadius:"16px", overflow:"hidden", boxshadow: "0 8px 24px rgba(0,0,0,0.15)",  border: "2px solid #333" }}>
                    <tbody>

                       <tr style= {{ backgroundColor: mode === "dark" ? theme.card : "#e3f2fd"}}>

                            <td style = {{ padding: "10px", fontWeight: "bold", border: `1px solid ${theme.border} `}}>  Temperature</td>
                             <td style ={{ padding: "10px", border: `1px solid ${theme.border} `}}>{weather.temperature_2m}  °C</td>
                       </tr>

                           <tr style= {{ backgroundColor: mode === "dark" ? theme.card : "#fff3e0"}}>

                             <td style = {{ padding: "10px", fontWeight: "bold", border: `1px solid ${theme.border} ` }}> Feels Like</td>
                             <td style = {{ padding: "10px", fontWeight: "bold",border: `1px solid ${theme.border} `}}>{weather.apparent_temperature} °C</td>
                       </tr>
                          
                        <tr style= {{ backgroundColor: mode === "dark" ? theme.card : "#e8f5e9"}}>

                               <td style = {{ padding: "10px", fontWeight: "bold", border: `1px solid ${theme.border} ` }}>Humidity</td>
                            <td style={{ padding: "10px", fontWeight: "bold", bborder: `1px solid ${theme.border} ` }}> {weather.relative_humidity_2m} % </td>
                       </tr>
                       
                            <tr style= {{ backgroundColor: mode === "dark" ? theme.card : "#f3e5f5"}}>

                             <td style = {{ padding: "10px", fontWeight: "bold" , border: `1px solid ${theme.border} `}}>Wind Speed</td>
                            <td style = {{padding: "10px", border: `1px solid ${theme.border} `}}>{weather.wind_speed_10m} km/h</td>
                       </tr>
     
                      <tr style= {{ backgroundColor: mode === "dark" ? theme.card : "#fce4ec"}}>

                            <td style= {{ padding: "10px",fontWeight: "bold", border: `1px solid ${theme.border} `}}> Wind Direction </td>
                            <td style = {{ padding: "10px", border: `1px solid ${theme.border} `}}>{weather.wind_direction_10m} ° </td>
                       </tr>
                    </tbody>

                  </table>

                

            </div>
            <TrendChart hourly={fullData?.hourly} theme={theme} />

            <button onClick={() => exportToExcel(selectedCity.name, fullData.daily,fullData.hourly)}
                style={{
                  background: theme.accent,
                  color: '#fff',
                  border:'none',
                  borderRadius:'8px',
                  padding:'12px 28px',
                  fontSize:'15px',
                  fontWeight:'bold',
                  cursor:'pointer',
                  marginTop:'20px',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.2)',
                }}
                >
                  Export to Excel
                </button>


            
          </>
            )}


              </div>
    );
  }


    
