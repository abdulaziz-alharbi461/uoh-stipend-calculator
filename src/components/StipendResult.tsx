import type { StipendResult as StipendResultType } from "@/lib/stipend-data";
import { AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

interface StipendResultProps {
  result: StipendResultType;
}

const StipendResult = ({ result }: StipendResultProps) => {
  const { isLastYear, isExpired, remainingSemesters, totalSemesters, elapsedSemesters, majorName } = result;

  return (
    <div className="animate-scale-in space-y-4">
      {/* Status Card */}
      <div
        className={`rounded-lg border p-5 ${
          isExpired
            ? "border-destructive/30 bg-destructive/5"
            : isLastYear
            ? "border-warning/30 bg-warning/5"
            : "border-success/30 bg-success/5"
        }`}
      >
        <div className="flex items-start gap-3">
          {isExpired ? (
            <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />
          ) : isLastYear ? (
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-warning" />
          ) : (
            <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-success" />
          )}
          <div>
            <h3 className="font-bold text-foreground">
              {isExpired
                ? "انتهت مدة استحقاق المكافأة"
                : isLastYear
                ? "تنبيه: السنة الأخيرة"
                : "المكافأة مستمرة"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isExpired
                ? "لقد تجاوزت المدة النظامية لاستحقاق المكافأة الجامعية."
                : isLastYear
                ? "هذه هي سنتك الأخيرة في استحقاق المكافأة، وستنقطع بنهاية العام الدراسي الحالي."
                : `لا يزال لديك ${remainingSemesters} فصل/فصول دراسية متبقية.`}
            </p>
          </div>
        </div>
      </div>

      {/* Details Card */}
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
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>التقدم</span>
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
  <div className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`text-sm font-medium ${highlight ? "text-success" : "text-foreground"}`}>
      {value}
    </span>
  </div>
);

export default StipendResult;
