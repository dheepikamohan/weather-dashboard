import { BarChart,Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const data = [
{day: "Mon" , high : 21, low : 13},
{day: "Tue" , high : 23, low : 14},
{day: "Wed" , high : 26, low : 15},
{day: "Thu" , high : 29, low : 17},
{day: "Fri" , high : 27, low : 16},
{day: "Sat" , high : 19, low : 12},
{day: "Sun" , high : 17, low : 10},

];
export default function Forecast() {
    return  (
        <ResponsiveContainer width ="100%" height={300}>
            <BarChart data ={data}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="high" fill ="#f0a04b" />
                <Bar dataKey="low" fill ="#3d6d9c" />
                
            </BarChart>
        </ResponsiveContainer>
    );
}