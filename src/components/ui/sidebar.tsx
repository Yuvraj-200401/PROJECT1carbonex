
'use client';
import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useMobile } from '@/hooks/use-mobile';

// --- Context ---
type SidebarContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
};

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return { ...context, toggle: () => context.setOpen((prev) => !prev) };
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useMobile();
  const [open, setOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  return (
    <SidebarContext.Provider value={{ open, setOpen, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

// --- Components ---
const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open } = useSidebar();
  return (
    <>
        <div 
            className={cn("fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 md:hidden",
                open ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => useSidebar().setOpen(false)}
        />
        <aside
            ref={ref}
            className={cn(
                'fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r bg-sidebar-gradient transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
                !open && '-translate-x-full',
                className
            )}
            {...props}
        />
    </>
  );
});
Sidebar.displayName = 'Sidebar';


const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex h-16 shrink-0 items-center justify-between border-b px-4', className)}
    {...props}
  />
));
SidebarHeader.displayName = 'SidebarHeader';

const SidebarBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-1 flex-col overflow-y-auto p-4', className)}
    {...props}
  />
));
SidebarBody.displayName = 'SidebarBody';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('sticky bottom-0 mt-auto flex flex-col border-t p-4', className)}
    {...props}
  />
));
SidebarFooter.displayName = 'SidebarFooter';

const SidebarSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1', className)} {...props} />
));
SidebarSection.displayName = 'SidebarSection';


// --- SidebarItem ---
const sidebarItemVariants = cva(
  'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
  {
    variants: {
      active: {
        true: 'bg-primary/20 text-primary',
        false:
          'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

interface SidebarItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof sidebarItemVariants> {
  icon?: React.ReactNode;
  href?: string;
}

const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ className, active, icon, children, href, onClick, ...props }, ref) => {
    const commonProps = {
      className: cn(sidebarItemVariants({ active }), className),
      ...props,
    };

    const content = (
      <>
        {icon && React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' })}
        <span>{children}</span>
      </>
    );
    
    // If no href, it's a button-like element
    if (!href) {
        return (
            <a ref={ref} onClick={onClick} {...commonProps} style={{cursor: 'pointer'}}>
                {content}
            </a>
        );
    }

    // It's a link
    return (
      <Link ref={ref} href={href} onClick={onClick} {...commonProps}>
        {content}
      </Link>
    );
  }
);
SidebarItem.displayName = 'SidebarItem';

export {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
};
