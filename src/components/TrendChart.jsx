import {
    LineChart ,Line, XAxis ,YAxis, CartesianGrid,Tooltip,Legend,ResponsiveContainer,
} from "recharts" ;

    export default function TrendChart({hourly, theme, hours = 48 }) {
    if (!hourly || !hourly.time) return null;

    const now = new Date();

    let startIndex = hourly.time.findIndex((t) => new Date(t) >= now);
    if (startIndex === -1 ) startIndex = 0;

    const data = hourly.time.slice(startIndex, startIndex + hours).map ((t , i) => {
        const d = new Date(t);
        const idx = startIndex + i ;
        return {
            label : d.toLocaleTimeString([],
                {
                    hour:"2-digit", minute: "2-digit"
                }),
                fullLabel: d.toLocaleTimeString([],
                    {
                        weekday: "short",
                        hour : "2-digit",
                        minute :"2-digit" ,

                    }),
            temp: hourly.temperature_2m?.[idx] ?? null,
            feels : hourly.apparent_temperature?.[idx] ?? null ,
                };
        });
        return(
            <div
                style ={{
                    background: theme.card,
                    color : theme.text,
                    border: `1px solid ${theme.border}`,
                    borderRadius:8,
                    padding:16,
                    marginTop: 24,
                }}
                >
                <h3 style={{marginTop: 0, color: theme.text}}>
                Temperature trend - next {hours} hours
                </h3>

                <ResponsiveContainer  width="100%" height={280}>
                <LineChart data ={data} margin = {{ top:8 ,right :16 , left: 0, bottom : 8 }}>
                <CartesianGrid stroke ={theme.border} strokeDasharray= "3 3" />

                <XAxis 
                    dataKey="label"
                   stroke={theme.text}
                   tick={{ fill: theme.text, fontSize:11 }}
                   unit =""
                   width ={45}
                   />

                   <YAxis 
                   stroke={theme.text}
                   unit =" C"
                   width ={45}
                   />

                   <Tooltip
                   contentStyle={{
                   background:theme.card,
                   border : `1px solid ${theme.border}`,
                   color: theme.text,
                   }}
                   labelStyle ={{ color: theme.text }}
                   />
                 
                
               

                <Legend wrapperStyle ={{ color: theme.text }}/>
                <Line type="monotone"dataKey="temp"name="Temperature"stroke="#f0a830"strokeWidth={2}dot={false}/>

                     <Line type="monotone"dataKey="feels" name="Feels like"stroke="#1565c0"strokeWidth={2}strokeDasharray=" 5 4"dot={false}/>
                     </LineChart>
                     </ResponsiveContainer>


   
            </div>
            );
        }
        
    
    


