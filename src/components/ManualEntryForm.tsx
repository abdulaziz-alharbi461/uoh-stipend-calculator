import { useState } from "react";
import { calculateStipend, getAdmissionYearOptions } from "@/lib/stipend-data";
import type { StipendResult } from "@/lib/stipend-data";
import { PenLine } from "lucide-react";

interface ManualEntryFormProps {
  onResult: (result: StipendResult) => void;
}

const MAX_DEFERRED_SEMESTERS = 3;

const ManualEntryForm = ({ onResult }: ManualEntryFormProps) => {
  const [majorName, setMajorName] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [duration, setDuration] = useState("");
  const [hours, setHours] = useState("");
  const [gpa, setGpa] = useState("");
  const [hasWarning, setHasWarning] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [transferSemesters, setTransferSemesters] = useState("");
  const [hasDeferred, setHasDeferred] = useState(false);
  const [deferredSemesters, setDeferredSemesters] = useState("");
  const [deferredError, setDeferredError] = useState("");
  const years = getAdmissionYearOptions();

  const handleDeferredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = value === "" ? 0 : parseInt(value, 10);
    if (num > MAX_DEFERRED_SEMESTERS) {
      setDeferredError("الحد الأقصى للفصول المؤجلة هو 3 فصول دراسية");
    } else {
      setDeferredError("");
    }
    setDeferredSemesters(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!majorName || !admissionYear || !duration || !hours || !gpa) return;
    if (isTransfer && !transferSemesters) return;
    if (hasDeferred && !deferredSemesters) return;
    if (hasDeferred && parseInt(deferredSemesters, 10) > MAX_DEFERRED_SEMESTERS) return;
    const result = calculateStipend({
      majorDurationYears: parseInt(duration),
      admissionYear: parseInt(admissionYear),
      majorName,
      registeredHours: parseInt(hours),
      gpa: parseFloat(gpa),
      hasWarning,
      isTransfer,
      transferSemesters: isTransfer ? parseInt(transferSemesters) : 0,
      hasDeferred,
      deferredSemesters: hasDeferred ? parseInt(deferredSemesters) : 0,
    });
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

        <label className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={isTransfer}
            onChange={(e) => setIsTransfer(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          <span className="text-sm font-medium text-foreground">
            هل أنت طالب محول من تخصص آخر؟
          </span>
        </label>

        {isTransfer && (
          <div className="animate-fade-in">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              عدد الفصول التي درستها قبل التحويل
            </label>
            <select
              value={transferSemesters}
              onChange={(e) => setTransferSemesters(e.target.value)}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="">اختر عدد الفصول</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n} فصل</option>
              ))}
            </select>
          </div>
        )}

        <label className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={hasDeferred}
            onChange={(e) => setHasDeferred(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          <span className="text-sm font-medium text-foreground">
            هل قمت بتأجيل فصول دراسية من قبل؟
          </span>
        </label>

        {hasDeferred && (
          <div className="animate-fade-in">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              عدد الفصول الدراسية المؤجلة
            </label>
            <select
              value={deferredSemesters}
              onChange={(e) => handleDeferredChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="">اختر عدد الفصول</option>
              {[1, 2, 3].map((n) => (
                <option key={n} value={n}>{n} فصل</option>
              ))}
            </select>
            {deferredError && (
              <p className="mt-1.5 text-sm text-destructive">{deferredError}</p>
            )}
          </div>
        )}


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

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">عدد الساعات المسجلة (لهذا الفصل)</label>
          <input
            type="number"
            min={1}
            max={30}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
            placeholder="مثال: 15"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">المعدل التراكمي الحالي (من 4.0)</label>
          <input
            type="number"
            min={0}
            max={4}
            step="0.01"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            required
            placeholder="مثال: 3.25"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
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

export default ManualEntryForm;
