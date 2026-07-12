import { useState } from "react";

import StipendForm from "@/components/StipendForm";
import StipendResult from "@/components/StipendResult";
import ManualEntryForm from "@/components/ManualEntryForm";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import type { StipendResult as StipendResultType } from "@/lib/stipend-data";

const Index = () => {
  const [result, setResult] = useState<StipendResultType | null>(null);
  const [showManual, setShowManual] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card py-5 transition-colors duration-300">
        <div className="container mx-auto flex items-center gap-4 px-4">
          <div className="h-10 w-10 shrink-0" aria-hidden="true" />
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-primary sm:text-2xl md:text-3xl">
              حاسبة استحقاق المكافأة الجامعية
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              كلية علوم وهندسة الحاسب - جامعة حائل
            </p>
          </div>
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto max-w-xl space-y-6">
          {!showManual ? (
            <StipendForm onResult={setResult} />
          ) : (
            <ManualEntryForm onResult={setResult} />
          )}

          {/* Toggle manual entry */}
          <div className="text-center">
            <button
              onClick={() => {
                setShowManual(!showManual);
                setResult(null);
              }}
              className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
              {showManual
                ? "العودة لتخصصات كلية الحاسب"
                : "لست من طلاب كلية الحاسب؟ - إضافة يدوية"}
            </button>
          </div>

          {/* Result */}
          {result && <StipendResult result={result} />}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
