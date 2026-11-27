import { BreadcrumbArrowIcon } from '@/shared/ui/icons';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[13px] leading-[1.6] font-medium text-subtle lg:text-base">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-heading">
                  {item.label}
                </span>
              ) : (
                <>
                  {item.href ? (
                    <a href={item.href} className="hover:text-ink">
                      {item.label}
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                  <BreadcrumbArrowIcon className="text-[#818B9C]" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
