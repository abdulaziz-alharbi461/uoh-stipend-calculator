import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-4">
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-center">
        <a
          href="https://www.linkedin.com/in/abdulaziz-al-harbi-22b952337?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <Linkedin className="h-4 w-4" />
          <span>حسابي في LinkedIn</span>
        </a>
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
};

export default Footer;
