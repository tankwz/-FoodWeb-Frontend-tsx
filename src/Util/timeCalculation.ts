function timeCalculation(timeToCal: Date, timeToAddInMs?: number) {
  const estimatedArrivalTime = new Date(
    timeToCal.getTime() + 7 * 60 * 60 * 1000 + (timeToAddInMs || 0)
  ); //^amazon has different timezone
  const formattedHours = String(estimatedArrivalTime.getHours()).padStart(
    2,
    '0'
  );
  const formattedMinutes = String(estimatedArrivalTime.getMinutes()).padStart(
    2,
    '0'
  );
  const formattedDay = String(estimatedArrivalTime.getDate()).padStart(2, '0');
  const formattedMonth = String(estimatedArrivalTime.getMonth() + 1).padStart(
    2,
    '0'
  ); // Months are zero-based, so add 1
  const formattedYear = estimatedArrivalTime.getFullYear();
  return `${formattedHours}:${formattedMinutes} - ${formattedDay}/${formattedMonth}/${formattedYear} `;
}

export default timeCalculation;
