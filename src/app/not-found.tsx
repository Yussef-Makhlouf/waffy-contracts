import { Button } from "@/components/ui/elements";
export default function NotFound() {
  return <div className="container fallback-page"><span className="index">404 / ALWAFI</span><h1>هذا المسار لم يُبنَ بعد.</h1><p>يمكنك العودة إلى الرئيسية واكتشاف الوافي.</p><Button href="/">العودة إلى الرئيسية</Button></div>;
}
