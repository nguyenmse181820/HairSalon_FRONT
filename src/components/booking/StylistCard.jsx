function StylistCard({ stylist, onSelect, isSelected }) {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer ${isSelected ? "bg-green-100 border-green-500" : "bg-white border-gray-300 hover:border-gray-500"
        }`}
      onClick={onSelect}
    >
      <h3 className="font-bold uppercase">{stylist.name}</h3>
      <div className="flex justify-between mt-2">
        <span>{stylist.price}</span>
      </div>
      <div className="flex font-semibold mt-2">
        <p>{stylist.experienceYears} year{stylist.experienceYears > 1 ? "s" : ""} experience</p>
      </div>
    </div>
  );
}

export default StylistCard;
