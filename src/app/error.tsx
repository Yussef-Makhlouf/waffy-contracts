"use client";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="container fallback-page"><span className="index">ALWAFI</span><h1>تعذّر عرض هذه الصفحة</h1><p>يمكنك إعادة المحاولة للمتابعة.</p><button className="button button--navy" onClick={reset}>إعادة المحاولة</button></div>;
}
