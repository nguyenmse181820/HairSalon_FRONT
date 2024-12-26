import React from "react";

function ServiceCard({ service, onSelect, isSelected }) {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer ${isSelected ? "bg-green-100 border-green-500" : "bg-white border-gray-300 hover:border-gray-500"
        }`}
      onClick={onSelect}
    >
      <h3 className="font-bold">{service.title}</h3>
      <p className="text-sm text-gray-600">{service.description}</p>
      <div className="flex justify-between mt-2">
        <span>{service.price || "Price varies"}</span>
        <span>{service.time}</span>
      </div>
    </div>
  );
}

export default ServiceCard;
