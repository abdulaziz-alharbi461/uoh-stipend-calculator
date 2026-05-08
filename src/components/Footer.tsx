import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    // mt-auto تضمن التصاق الفوتر بأسفل الصفحة، وحذفنا الـ border-t لإزالة الخط العلوي
    <footer className="mt-auto w-full py-6">
      <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center">
        
        {/* رابط LinkedIn أصبح الآن مباشرة فوق سطر الحقوق */}
        <a
          href="https://www.linkedin.com/in/abdulaziz-al-harbi-22b952337?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary font-sans"
        >
          <Linkedin className="h-4 w-4 text-primary" />
          <span>حسابي في LinkedIn</span>
        </a>

        
      </div>
    </footer>
  );
};

export default Footer;