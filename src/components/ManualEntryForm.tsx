import { useState } from "react";
import { calculateStipend, getAdmissionYearOptions } from "@/lib/stipend-data";
import type { StipendResult } from "@/lib/stipend-data";
import { PenLine } from "lucide-react";

interface ManualEntryFormProps {
  onResult: (result: StipendResult) => void;
}

const ManualEntryForm = ({ onResult }: ManualEntryFormProps) => {
  const [majorName, setMajorName] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [duration, setDuration] = useState("");
  const years = getAdmissionYearOptions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!majorName || !admissionYear || !duration) return;
    const result = calculateStipend(parseInt(duration), parseInt(admissionYear), majorName);
    onResult(result);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in rounded-lg border border-border bg-card p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
          <PenLine className="h-5 w-5 text-accent-foreground" />
        </div>
        <h2 className="text-lg font-bold text-foreground">إدخال يدوي</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">اسم التخصص</label>
          <input
            type="text"
            value={majorName}
            onChange={(e) => setMajorName(e.target.value)}
            required
            placeholder="أدخل اسم التخصص"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">سنة القبول</label>
          <select
            value={admissionYear}
            onChange={(e) => setAdmissionYear(e.target.value)}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="">اختر سنة القبول</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">مدة الدراسة (بالسنوات)</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="">اختر المدة</option>
            <option value="3">٣ سنوات</option>
            <option value="4">٤ سنوات</option>
            <option value="5">٥ سنوات</option>
            <option value="6">٦ سنوات</option>
            <option value="7">٧ سنوات</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/20"
        >
          احسب الاستحقاق
        </button>
      </div>
    </form>
  );
};

export default ManualEntryForm;
