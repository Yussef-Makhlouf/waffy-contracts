import { networkCategories } from "@/content/services";
import { ServiceIconView } from "@/components/ui/elements";

export function NetworkCapabilities({ compact = false }: { compact?: boolean }) {
  return <div className={`network-categories ${compact ? "network-categories--compact" : ""}`}>{networkCategories.map(category => <article className="network-category" key={category.id}><div className="network-category-top"><ServiceIconView name={category.icon} size={25} /><span className="index" aria-hidden="true">{category.number}</span></div><h3>{category.title}</h3>{!compact && <p>{category.text}</p>}</article>)}</div>;
}
