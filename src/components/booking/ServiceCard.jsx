import React from "react";

function ServiceCard({ service, onSelect }) {
  return (
    <div
      className="border p-4 rounded-lg cursor-pointer hover:shadow-lg"
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
