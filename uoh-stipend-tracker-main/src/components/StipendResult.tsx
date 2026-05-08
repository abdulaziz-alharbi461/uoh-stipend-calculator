import type { StipendResult as StipendResultType } from "@/lib/stipend-data";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

interface StipendResultProps {
  result: StipendResultType;
}

const StipendResult = ({ result }: StipendResultProps) => {
  const {
    isLastYear,
    isExpired,
    remainingSemesters,
    totalSemesters,
    elapsedSemesters,
    majorName,
    registeredHours,
    gpa,
    hasWarning,
    status,
    reasons,
  } = result;

  const statusMeta = {
    eligible: {
      title: "مستحق للمكافأة",
      desc: "تستوفي جميع الشروط الأساسية لاستحقاق المكافأة الجامعية.",
      cls: "border-success/40 bg-success/5",
      icon: <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-success" />,
    },
    not_eligible: {
      title: "غير مستحق للمكافأة",
      desc: "لا تستوفي شرطًا أو أكثر من شروط الاستحقاق. راجع الأسباب أدناه.",
      cls: "border-destructive/40 bg-destructive/5",
      icon: <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />,
    },
    check: {
      title: "يرجى التحقق",
      desc: "يوجد عوامل قد تؤثر على استحقاقك، يُنصح بمراجعة الجهة المختصة.",
      cls: "border-warning/40 bg-warning/5",
      icon: <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-warning" />,
    },
  }[status];

  const warnings: { type: "warn" | "fail"; text: string }[] = [];
  if (registeredHours < 12)
    warnings.push({
      type: "fail",
      text: "تنبيه: يجب ألا يقل عدد الساعات المسجلة عن 12 ساعة لاستحقاق المكافأة.",
    });
  if (gpa < 1.0)
    warnings.push({
      type: "fail",
      text: "تنبيه: المكافأة تُقطع إذا نزل المعدل التراكمي عن 1.0 (من نظام 4.0).",
    });
  if (hasWarning)
    warnings.push({
      type: "warn",
      text: "تنبيه: وجود إنذار أكاديمي قد يؤثر على استمرار صرف المكافأة.",
    });
  if (isLastYear)
    warnings.push({
      type: "warn",
      text: "تنبيه: هذه هي آخر سنة لك، وبعدها تنقطع المكافأة.",
    });

  return (
    <div className="animate-scale-in space-y-4">
      {/* Final Status Card */}
      <div className={`rounded-lg border-2 p-5 ${statusMeta.cls}`}>
        <div className="flex items-start gap-3">
          {statusMeta.icon}
          <div>
            <h3 className="text-lg font-bold text-foreground">{statusMeta.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{statusMeta.desc}</p>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          {warnings.map((w, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 rounded-md border-2 p-3 text-sm ${
                w.type === "fail"
                  ? "border-destructive/40 bg-destructive/5 text-destructive"
                  : "border-warning/40 bg-warning/10 text-foreground"
              }`}
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{w.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Reasons */}
      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-bold text-foreground">أسباب القرار</h3>
        <ul className="space-y-2">
          {reasons.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              {r.type === "pass" ? (
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              ) : r.type === "fail" ? (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              ) : (
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              )}
              <span className="text-foreground">{r.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Details */}
      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-bold text-foreground">تفاصيل الاستحقاق</h3>
        <div className="space-y-3">
          <DetailRow label="التخصص" value={majorName} />
          <DetailRow label="إجمالي الفصول المستحقة" value={`${totalSemesters} فصل`} />
          <DetailRow label="الفصول المنقضية" value={`${elapsedSemesters} فصل`} />
          <DetailRow
            label="الفصول المتبقية"
            value={
              isExpired
                ? "انتهت المدة"
                : isLastYear || remainingSemesters === 0
                ? "هذه آخر سنة لك، وبعدها تنقطع المكافأة"
                : `${remainingSemesters} فصل`
            }
            highlight={!isExpired && remainingSemesters > 0 && !isLastYear}
          />
          <DetailRow label="الساعات المسجلة" value={`${registeredHours} ساعة`} />
          <DetailRow label="المعدل التراكمي" value={gpa.toFixed(2)} />
          <DetailRow label="إنذار أكاديمي" value={hasWarning ? "نعم" : "لا"} />
        </div>

        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>التقدم في المدة النظامية</span>
            <span>{Math.round((elapsedSemesters / totalSemesters) * 100)}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isExpired ? "bg-destructive" : isLastYear ? "bg-warning" : "bg-success"
              }`}
              style={{ width: `${Math.min(100, (elapsedSemesters / totalSemesters) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-2 last:border-0 last:pb-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`text-sm font-medium text-left ${highlight ? "text-success" : "text-foreground"}`}>
      {value}
    </span>
  </div>
);

export default StipendResult;
