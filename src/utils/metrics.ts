function toNumber(value: any): number {
  if (value === null || value === undefined) return 0;

  return Number(
    String(value)
      .replace(/,/g, "")
      .replace(/\s/g, "")
      .trim()
  );
}

export default function calculateMetrics(currentLog: any, previousLog: any) {
  if (!previousLog) {
    return {
      distance: 0,
      kmPerLiter: 0,
      costPerKm: 0,
    };
  }

  const currentOdometer = toNumber(currentLog.odometer);
  const previousOdometer = toNumber(previousLog.odometer);
  const liters = toNumber(currentLog.liters);
  const amount = toNumber(currentLog.amount);

  const distance = currentOdometer - previousOdometer;

  if (distance <= 0 || liters <= 0 || amount <= 0) {
    return {
      distance: 0,
      kmPerLiter: 0,
      costPerKm: 0,
    };
  }

  return {
    distance,
    kmPerLiter: Number(distance / liters).toFixed(2),
    costPerKm: Number(amount / distance).toFixed(2),
  };
}