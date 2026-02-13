export interface Major {
  name: string;
  duration: number; // in years
  semesters: number;
}

export const PREDEFINED_MAJORS: Major[] = [
  // 5 Years (10 semesters)
  { name: "هندسة الحاسب", duration: 5, semesters: 10 },
  { name: "هندسة البرمجيات", duration: 5, semesters: 10 },
  { name: "هندسة الشبكات والاتصالات", duration: 5, semesters: 10 },
  // 4 Years (8 semesters)
  { name: "علوم الحاسب الآلي", duration: 4, semesters: 8 },
  { name: "أمن المعلومات", duration: 4, semesters: 8 },
  { name: "الذكاء الاصطناعي", duration: 4, semesters: 8 },
  { name: "علم البيانات", duration: 4, semesters: 8 },
];

export interface StipendResult {
  totalSemesters: number;
  elapsedSemesters: number;
  remainingSemesters: number;
  remainingYears: number;
  isLastYear: boolean;
  isExpired: boolean;
  majorName: string;
}

export function calculateStipend(
  majorDurationYears: number,
  admissionYear: number,
  majorName: string
): StipendResult {
  const totalSemesters = majorDurationYears * 2;
  
  // Current academic year calculation
  // Academic year starts in September
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentCalendarYear = now.getFullYear();
  
  // If we're in Sept or later, we're in the academic year that started this calendar year
  // Otherwise, we're in the academic year that started last calendar year
  const currentAcademicStartYear = currentMonth >= 9 ? currentCalendarYear : currentCalendarYear - 1;
  
  const yearsElapsed = currentAcademicStartYear - admissionYear;
  
  // Each academic year = 2 semesters, but we count the current year as in-progress
  // So elapsed semesters = yearsElapsed * 2 (completed years) 
  // Current year is ongoing, so we're in semester (yearsElapsed * 2 + 1) or (yearsElapsed * 2 + 2)
  const isSecondSemester = currentMonth >= 2 && currentMonth < 9;
  const currentSemesterInYear = isSecondSemester ? 2 : 1;
  const elapsedSemesters = yearsElapsed * 2 + currentSemesterInYear;
  
  const remainingSemesters = Math.max(0, totalSemesters - elapsedSemesters);
  const remainingYears = Math.ceil(remainingSemesters / 2);
  
  const isLastYear = yearsElapsed === majorDurationYears - 1 && remainingSemesters > 0;
  const isExpired = elapsedSemesters > totalSemesters;

  return {
    totalSemesters,
    elapsedSemesters: Math.min(elapsedSemesters, totalSemesters),
    remainingSemesters,
    remainingYears,
    isLastYear,
    isExpired,
    majorName,
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
