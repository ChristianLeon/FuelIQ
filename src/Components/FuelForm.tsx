import { useEffect, useState } from "react";

type FuelFormData = {
  station: string;
  fuelType: string;
  amount: string;
  liters: string;
  pricePerLiter: string;
  odometer: string;
  rangeBefore: string;
  rangeAfter: string;
  latitude: string;
  longitude: string;
};

type FuelFormProps = {
  onSave: (form: FuelFormData) => void;
  initialData?: Partial<FuelFormData> | null;
};

export default function FuelForm({ onSave, initialData }: FuelFormProps) {
  const emptyForm: FuelFormData = {
    station: "Valero",
    fuelType: "Regular",
    amount: "",
    liters: "20",
    pricePerLiter: "",
    odometer: "",
    rangeBefore: "",
    rangeAfter: "",
    latitude: "",
    longitude: "",
  };

  const [form, setForm] = useState<FuelFormData>(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        station: initialData.station || "Valero",
        fuelType: initialData.fuelType || "Regular",
        amount: initialData.amount || "",
        liters: initialData.liters || "20",
        pricePerLiter: initialData.pricePerLiter || "",
        odometer: initialData.odometer || "",
        rangeBefore: initialData.rangeBefore || "",
        rangeAfter: initialData.rangeAfter || "",
        latitude: initialData.latitude || "",
        longitude: initialData.longitude || "",
      });
    }
  }, [initialData]);

  const calculatePricePerLiter = (amount: string, liters: string) => {
    if (!amount || !liters) return "";
    return (Number(amount) / Number(liters)).toFixed(2);
  };

  const handleAmountChange = (value: string) => {
    setForm({
      ...form,
      amount: value,
      pricePerLiter: calculatePricePerLiter(value, form.liters),
    });
  };

  const handleLitersChange = (value: string) => {
    setForm({
      ...form,
      liters: value,
      pricePerLiter: calculatePricePerLiter(form.amount, value),
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta GPS");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm({
          ...form,
          latitude: String(position.coords.latitude),
          longitude: String(position.coords.longitude),
        });
      },
      () => {
        alert("No fue posible obtener la ubicación");
      }
    );
  };

  const handleSubmit = () => {
    if (!form.amount || !form.liters || !form.odometer) {
      alert("Completa monto, litros y odómetro");
      return;
    }

    onSave(form);
    setForm(emptyForm);
  };

  const inputClass =
    "w-full bg-black/30 border border-white/10 text-white rounded-2xl p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-zinc-500";

  const selectClass =
    "w-full bg-black/30 border border-white/10 text-white rounded-2xl p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400";

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">
        {initialData ? "Editar carga" : "Registrar carga"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Gasolinera</label>
          <select
            className={selectClass}
            value={form.station}
            onChange={(e) => setForm({ ...form, station: e.target.value })}
          >
            <option value="Pemex">Pemex</option>
            <option value="Valero">Valero</option>
            <option value="Mobil">Mobil</option>
            <option value="G500">G500</option>
            <option value="Shell">Shell</option>
            <option value="BP">BP</option>
            <option value="Urban">Urban</option>
            <option value="Otra">Otra</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Tipo de gasolina
          </label>
          <select
            className={selectClass}
            value={form.fuelType}
            onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
          >
            <option value="Regular">Regular</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Litros</label>
          <select
            className={selectClass}
            value={form.liters}
            onChange={(e) => handleLitersChange(e.target.value)}
          >
            <option value="20">20 L</option>
            <option value="40">40 L</option>
            <option value="50">50 L</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Total pagado
          </label>
          <input
            className={inputClass}
            placeholder="$"
            type="number"
            value={form.amount}
            onChange={(e) => handleAmountChange(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Precio por litro
          </label>
          <input
            className="w-full bg-black/20 border border-white/10 text-green-400 rounded-2xl p-3 mb-3 font-bold"
            type="text"
            value={form.pricePerLiter ? `$${form.pricePerLiter} / L` : ""}
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Kilometraje actual
          </label>
          <input
            className={inputClass}
            placeholder="Kilometraje actual del Mazda 6"
            type="number"
            value={form.odometer}
            onChange={(e) => setForm({ ...form, odometer: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Km restantes antes
          </label>
          <input
            className={inputClass}
            placeholder="Antes de cargar"
            type="number"
            value={form.rangeBefore}
            onChange={(e) => setForm({ ...form, rangeBefore: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Km restantes después
          </label>
          <input
            className={inputClass}
            placeholder="Después de cargar"
            type="number"
            value={form.rangeAfter}
            onChange={(e) => setForm({ ...form, rangeAfter: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Ubicación GPS
          </label>
          <button
            type="button"
            onClick={getCurrentLocation}
            className="w-full rounded-2xl p-3 bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 text-blue-200 transition-all duration-300"
          >
            Guardar GPS
          </button>

          {form.latitude && form.longitude && (
            <p className="text-sm text-zinc-400 mt-2">
              GPS: {Number(form.latitude).toFixed(5)},{" "}
              {Number(form.longitude).toFixed(5)}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-gradient-to-r from-green-400 to-emerald-500 text-black px-6 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/20"
      >
        {initialData ? "Actualizar" : "Guardar"}
      </button>
    </div>
  );
}