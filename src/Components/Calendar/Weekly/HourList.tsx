interface HourListProps {
  hours: number[];
}

const HourList: React.FC<HourListProps> = ({ hours }) => {
  return (
    <div className="pt-5 w-8 h-8">
      {hours.map(hour => (
        <div key={hour} className="h-8">{hour}</div>
      ))}
    </div>
  );
};

export default HourList