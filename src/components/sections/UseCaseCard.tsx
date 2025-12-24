interface UseCase {
  title: string;
  description: string;
  impacts: string[];
}

interface UseCaseCardProps {
  useCase: UseCase;
}

export function UseCaseCard({ useCase }: UseCaseCardProps) {
  return (
    <article className="group bg-card rounded-lg overflow-hidden p-6 hover:shadow-lg transition-shadow border border-border">
      <h3 className="text-xl font-display font-semibold mb-4">{useCase.title}</h3>
      <p className="text-muted-foreground font-body mb-6">{useCase.description}</p>
      <div className="border-t border-border pt-4">
        <p className="text-sm font-semibold text-foreground mb-2">Impact:</p>
        <ul className="space-y-1">
          {useCase.impacts.map((impact, i) => (
            <li key={i} className="text-sm text-muted-foreground font-body flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {impact}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}