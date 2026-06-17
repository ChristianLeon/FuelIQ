export const STORAGE_KEY = "fueliq_logs";

export function loadLogs(): any[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading logs", error);
    return [];
  }
}

export function saveLogs(logs: any[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error("Error saving logs", error);
  }
}