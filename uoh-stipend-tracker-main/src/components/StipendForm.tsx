import { useState } from "react";
import { PREDEFINED_MAJORS, calculateStipend, getAdmissionYearOptions } from "@/lib/stipend-data";
import type { StipendResult } from "@/lib/stipend-data";
import { GraduationCap } from "lucide-react";

interface StipendFormProps {
  onResult: (result: StipendResult) => void;
}

const StipendForm = ({ onResult }: StipendFormProps) => {
  const [selectedMajor, setSelectedMajor] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [hours, setHours] = useState("");
  const [gpa, setGpa] = useState("");
  const [hasWarning, setHasWarning] = useState(false);
  const years = getAdmissionYearOptions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const major = PREDEFINED_MAJORS.find((m) => m.name === selectedMajor);
    if (!major || !admissionYear || !hours || !gpa) return;
    const result = calculateStipend({
      majorDurationYears: major.duration,
      admissionYear: parseInt(admissionYear),
      majorName: major.name,
      registeredHours: parseInt(hours),
      gpa: parseFloat(gpa),
      hasWarning,
    });
    onResult(result);
  };

  const inputCls =
    "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in rounded-lg border border-border bg-card p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-bold text-foreground">بيانات الطالب</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">التخصص</label>
          <select
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            required
            className={inputCls}
          >
            <option value="">اختر التخصص</option>
            <optgroup label="٥ سنوات (١٠ فصول)">
              {PREDEFINED_MAJORS.filter((m) => m.duration === 5).map((m) => (
                <option key={m.name} value={m.name}>{m.name}</option>
              ))}
            </optgroup>
            <optgroup label="٤ سنوات (٨ فصول)">
              {PREDEFINED_MAJORS.filter((m) => m.duration === 4).map((m) => (
                <option key={m.name} value={m.name}>{m.name}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">سنة القبول</label>
          <select
            value={admissionYear}
            onChange={(e) => setAdmissionYear(e.target.value)}
            required
            className={inputCls}
          >
            <option value="">اختر سنة القبول</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            عدد الساعات المسجلة (لهذا الفصل)
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
            placeholder="مثال: 15"
            className={inputCls}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            المعدل التراكمي الحالي (من 4.0)
          </label>
          <input
            type="number"
            min={0}
            max={4}
            step="0.01"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            required
            placeholder="مثال: 3.25"
            className={inputCls}
          />
        </div>

        <label className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={hasWarning}
            onChange={(e) => setHasWarning(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          <span className="text-sm font-medium text-foreground">هل لديك إنذار أكاديمي؟</span>
        </label>

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

export default StipendForm;
