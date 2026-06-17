export default function calculateMetrics(currentLog: any, previousLog: any) {
  if (!previousLog) {
    return {
      distance: 0,
      kmPerLiter: 0,
      costPerKm: 0,
    };
  }

  const distance = Number(currentLog.odometer) - Number(previousLog.odometer);

  if (distance <= 0) {
    return {
      distance: 0,
      kmPerLiter: 0,
      costPerKm: 0,
    };
  }

  return {
    distance,
    kmPerLiter: Number(distance / Number(currentLog.liters)).toFixed(2),
    costPerKm: Number(currentLog.amount / distance).toFixed(2),
  };
}