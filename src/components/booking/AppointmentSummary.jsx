import React from "react";
function AppointmentSummary({ service, stylist, selectedDate, selectedTime }) {
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace("$", ""));
  };

  const parseTime = (timeString) => {
    const hoursMatch = timeString.match(/(\d+)\s*hr/);
    const minutesMatch = timeString.match(/(\d+)\s*min/);
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    return hours * 60 + minutes;
  };

  const totalServicesPrice = service.reduce((totalPrice, selectedServices) => {
    return totalPrice + parsePrice(selectedServices.price);
  }, 0);

  const totalServicesTime = service.reduce((totalMinutes, selectedServices) => {
    return totalMinutes + parseTime(selectedServices.time);
  }, 0)
  const stylistPrice = parsePrice(stylist?.price);
  const stylistTime = parseTime(stylist?.time || "0 min");

  const totalPrice = (totalServicesPrice + stylistPrice).toFixed(2);
  const totalMinutes = totalServicesTime + stylistTime;
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const totalTimeString = `${hours > 0 ? `${hours} hr ` : ""}${minutes} min+`;

  return (
    <div className=''>
      <h2 className="text-2xl font-bold pb-2">Appointment Summary</h2>
      <div className="p-4">
        {service.length > 0 || stylist ? (
          <>
            {service.length > 0 && (
              <>
              <h3 className="mt-2 font-bold">Selected Services:</h3>
              {service.map((s) => (
                <div key={s.id} className="mb-2">
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-sm text-gray-600">{s.description}</p>
                  <p>
                    {s.price} · {s.time}
                  </p>
                </div>
              ))}
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
            <div className="mt-4 pt-2">
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
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">General Information</h3>
          <p>
            <strong>Address</strong>: 55 Nguyen Dinh Chieu, Ho Chi Minh
          </p>
          <p>
            <strong>Phone</strong>: 0339383282
          </p>
          <p>
            <strong>Hours</strong>: Mon - Sat, 9:00 AM - 10:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppointmentSummary;
