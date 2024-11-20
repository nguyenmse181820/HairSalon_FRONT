function StylistCard({ stylist, onSelect }) {
  return (
    <div
      className="border p-4 rounded-lg cursor-pointer hover:shadow-lg"
      onClick={onSelect}
    >
      <h3 className="font-bold uppercase">{stylist.name}</h3>
      <div className="flex justify-between mt-2">
        <span>{stylist.price}</span>
        <span>{stylist.time}</span>
      </div>
    </div>
  );
}

export default StylistCard;
