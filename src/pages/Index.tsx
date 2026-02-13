import { useState } from "react";
import uohLogo from "@/assets/uoh-logo.png";
import StipendForm from "@/components/StipendForm";
import StipendResult from "@/components/StipendResult";
import ManualEntryForm from "@/components/ManualEntryForm";
import Footer from "@/components/Footer";
import type { StipendResult as StipendResultType } from "@/lib/stipend-data";

const Index = () => {
  const [result, setResult] = useState<StipendResultType | null>(null);
  const [showManual, setShowManual] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card py-6">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4">
          <img src={uohLogo} alt="شعار جامعة حائل" className="h-20 w-20 object-contain" />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary md:text-3xl">
              حاسبة استحقاق المكافأة الجامعية
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              كلية علوم وهندسة الحاسب - جامعة حائل
            </p>
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
              className="text-sm text-info underline underline-offset-4 transition-colors hover:text-primary"
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
