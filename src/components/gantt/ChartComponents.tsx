
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Rectangle } from "recharts";

export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-md rounded-md border">
        <p className="font-semibold">{data.name}</p>
        <p>Début: {format(new Date(data.start), 'dd MMM yyyy', { locale: fr })}</p>
        <p>Fin: {format(new Date(data.end), 'dd MMM yyyy', { locale: fr })}</p>
        <p>Progression: {data.progress}%</p>
      </div>
    );
  }
  return null;
};

export const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  
  const progress = payload.progress || 0;
  
  const progressWidth = (width * progress) / 100;
  
  return (
    <g>
      <Rectangle 
        x={x} 
        y={y} 
        width={width} 
        height={height} 
        fill="#e0e0e0" 
        radius={[4, 4, 4, 4]}
      />
      <Rectangle 
        x={x} 
        y={y} 
        width={progressWidth} 
        height={height} 
        fill="#3182CE" 
        radius={progress === 100 ? [4, 4, 4, 4] : [4, 0, 0, 4]}
      />
    </g>
  );
};
