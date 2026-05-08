export interface Major {
  name: string;
  duration: number;
  semesters: number;
}

export const PREDEFINED_MAJORS: Major[] = [
  { name: "هندسة الحاسب", duration: 5, semesters: 10 },
  { name: "هندسة البرمجيات", duration: 5, semesters: 10 },
  { name: "هندسة الشبكات والاتصالات", duration: 5, semesters: 10 },
  { name: "علوم الحاسب الآلي", duration: 4, semesters: 8 },
  { name: "أمن المعلومات", duration: 4, semesters: 8 },
  { name: "الذكاء الاصطناعي", duration: 4, semesters: 8 },
  { name: "علم البيانات", duration: 4, semesters: 8 },
];

export interface EligibilityReason {
  type: "pass" | "fail" | "warn";
  text: string;
}

export interface StipendResult {
  totalSemesters: number;
  elapsedSemesters: number;
  remainingSemesters: number;
  remainingYears: number;
  isLastYear: boolean;
  isExpired: boolean;
  majorName: string;
  // new fields
  registeredHours: number;
  gpa: number;
  hasWarning: boolean;
  isEligible: boolean;
  status: "eligible" | "not_eligible" | "check";
  reasons: EligibilityReason[];
}

export interface CalculateInput {
  majorDurationYears: number;
  admissionYear: number;
  majorName: string;
  registeredHours: number;
  gpa: number;
  hasWarning: boolean;
}

export function calculateStipend(input: CalculateInput): StipendResult {
  const { majorDurationYears, admissionYear, majorName, registeredHours, gpa, hasWarning } = input;
  const totalSemesters = majorDurationYears * 2;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentCalendarYear = now.getFullYear();
  const currentAcademicStartYear = currentMonth >= 9 ? currentCalendarYear : currentCalendarYear - 1;
  const yearsElapsed = currentAcademicStartYear - admissionYear;
  const isSecondSemester = currentMonth >= 2 && currentMonth < 9;
  const currentSemesterInYear = isSecondSemester ? 2 : 1;
  const elapsedSemesters = yearsElapsed * 2 + currentSemesterInYear;

  const remainingSemesters = Math.max(0, totalSemesters - elapsedSemesters);
  const remainingYears = Math.ceil(remainingSemesters / 2);
  const isLastYear = yearsElapsed === majorDurationYears - 1 && remainingSemesters > 0;
  const isExpired = elapsedSemesters > totalSemesters;

  const reasons: EligibilityReason[] = [];

  // Duration
  if (isExpired) {
    reasons.push({ type: "fail", text: "انتهت المدة النظامية لاستحقاق المكافأة الجامعية." });
  } else if (isLastYear) {
    reasons.push({ type: "warn", text: "هذه آخر سنة لك، وبعدها تنقطع المكافأة." });
  } else {
    reasons.push({ type: "pass", text: `لا تزال ضمن المدة النظامية (${remainingSemesters} فصل متبقي).` });
  }

  // Hours
  if (registeredHours < 12) {
    reasons.push({
      type: "fail",
      text: "عدد الساعات المسجلة أقل من 12 ساعة، وهي الحد الأدنى لاستحقاق المكافأة.",
    });
  } else {
    reasons.push({ type: "pass", text: `عدد الساعات المسجلة (${registeredHours}) يحقق الحد الأدنى المطلوب (12 ساعة).` });
  }

  // GPA (out of 4.0, threshold 1.0)
  if (gpa < 1.0) {
    reasons.push({
      type: "fail",
      text: "المعدل التراكمي أقل من 1.0 (من نظام 4.0)، مما يؤدي إلى قطع المكافأة.",
    });
  } else if (gpa < 1.5) {
    reasons.push({
      type: "warn",
      text: "المعدل التراكمي قريب من الحد الأدنى (1.0)، يُنصح برفعه لتجنب قطع المكافأة.",
    });
  } else {
    reasons.push({ type: "pass", text: `المعدل التراكمي (${gpa.toFixed(2)} من 4.0) ضمن الحدود الآمنة.` });
  }

  // Warning
  if (hasWarning) {
    reasons.push({
      type: "warn",
      text: "وجود إنذار أكاديمي قد يؤثر على الاستحقاق ويتطلب مراجعة اللائحة.",
    });
  } else {
    reasons.push({ type: "pass", text: "لا يوجد إنذار أكاديمي." });
  }

  const hasFail = reasons.some((r) => r.type === "fail");
  const hasWarn = reasons.some((r) => r.type === "warn");
  const status: "eligible" | "not_eligible" | "check" = hasFail
    ? "not_eligible"
    : hasWarn
    ? "check"
    : "eligible";
  const isEligible = !hasFail;

  return {
    totalSemesters,
    elapsedSemesters: Math.min(elapsedSemesters, totalSemesters),
    remainingSemesters,
    remainingYears,
    isLastYear,
    isExpired,
    majorName,
    registeredHours,
    gpa,
    hasWarning,
    isEligible,
    status,
    reasons,
  };
}

export function getAdmissionYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= currentYear - 7; y--) {
    years.push(y);
  }
  return years;
}
