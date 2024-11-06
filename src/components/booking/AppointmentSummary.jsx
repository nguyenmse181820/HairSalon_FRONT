function AppointmentSummary({ service, stylist, selectedDate, selectedTime }) {
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace("$", ""));
  };

  const servicePrice = parsePrice(service?.price);
  const stylistPrice = parsePrice(stylist?.price);
  const totalPrice = (servicePrice + stylistPrice).toFixed(2);

  const serviceTime = service?.time || "0 min";
  const stylistTime = stylist?.time || "0 min";

  const parseTime = (timeString) => {
    const hoursMatch = timeString.match(/(\d+)\s*hr/);
    const minutesMatch = timeString.match(/(\d+)\s*min/);
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    return hours * 60 + minutes;
  };

  const totalMinutes = parseTime(serviceTime) + parseTime(stylistTime);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const totalTimeString = `${hours > 0 ? `${hours} hr ` : ""}${minutes} min +`;

  return (
    <div>
      <h2 className="text-2xl font-bold pb-8">Appointment Summary</h2>
      <div className="border p-4 rounded-lg">
        {service || stylist ? (
          <>
            {service && (
              <>
                <p className="mt-2 font-bold">{service.title}</p>
                <p className="text-sm text-gray-600">{service.description}</p>
                <p>
                  {service.price} · {service.time}
                </p>
              </>
            )}
            {stylist && (
              <>
                <p className="mt-2 font-bold">Stylist: {stylist.name}</p>
                <p>
                  {stylist.price} · {stylist.time}
                </p>
              </>
            )}
            <div className="mt-4 border-t pt-2">
              <p className="font-semibold">Total Price: ${totalPrice}</p>
              <p className="font-semibold">Total Time: {totalTimeString}</p>
              <p className="font-semibold">
                Date: {selectedDate || "Not selected"}
              </p>
              <p className="font-semibold">
                Time: {selectedTime || "Not selected"}
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-500 mt-2">No services added yet</p>
        )}
      </div>
    </div>
  );
}

export default AppointmentSummary;
