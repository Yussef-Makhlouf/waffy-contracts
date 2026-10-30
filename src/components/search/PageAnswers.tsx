import Link from "next/link";
import { ArrowTopLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { searchPages, type SearchPath } from "@/content/search";
import { Eyebrow } from "@/components/ui/elements";
import styles from "./PageAnswers.module.css";

export function RelatedPages({ path }: { path: SearchPath }) {
  const page = searchPages[path];
  const date = new Intl.DateTimeFormat("ar-SA-u-ca-gregory", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${page.updated}T00:00:00Z`));
  return <div className={styles.related}>
    <div className="container">
      <nav className={styles.relatedNav} aria-label="صفحات مرتبطة"><span className={styles.relatedLabel}>أكمل الصورة</span>{page.related.map(route => <Link key={route} href={route}>{searchPages[route].label}<ArrowTopLeftIcon width={16} height={16} aria-hidden="true" /></Link>)}</nav>
      <p className={styles.reviewed}>آخر مراجعة للمحتوى: <time dateTime={page.updated}>{date}</time></p>
    </div>
  </div>;
}

/** Answers remain in server HTML and are usable without JavaScript. */
export function PageAnswers({ path }: { path: SearchPath }) {
  const page = searchPages[path];
  return <>
    <section id="questions" className={styles.section} aria-labelledby="questions-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <Eyebrow english="A CLEARER START">أسئلة وإجابات</Eyebrow>
          <h2 id="questions-title">{page.answerHeading}</h2>
          <p>تفاصيل تساعدك على فهم المجال، وتحديد ما تحتاج إلى مناقشته لمشروعك.</p>
        </div>
        <div className={styles.answers}>{page.faqs.map((faq, index) => <details key={faq.id} id={`faq-${faq.id}`} className={styles.answer} name="page-questions" data-faq>
          <summary><span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{faq.question}</h3><PlusIcon width={20} height={20} aria-hidden="true" /></summary>
          <p>{faq.answer}</p>
        </details>)}</div>
      </div>
    </section>
    <RelatedPages path={path} />
  </>;
}
