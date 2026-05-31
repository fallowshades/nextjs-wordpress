import {type AnchorHTMLAttributes, type ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface CyberCardBaseProps {
  children: ReactNode
  className?: string
}

type ExternalLinkProps = CyberCardBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    to?: never
  }

type InternalLinkProps = CyberCardBaseProps &
  //   LinkProps &
  {
    to: string
    href?: never
  }

type CyberCardProps = ExternalLinkProps | InternalLinkProps

export function CyberCard({children, className, ...props}: CyberCardProps) {
  const baseClassName = twMerge(
    'group relative block p-6 border border-primary-muted bg-app-background hover:border-primary-vivid hover:bg-primary-background/50 focus:outline-none focus:ring-1 focus:ring-primary-vivid',
    className
  )

  const content = (
    <>
      {/* Corner Accents */}
      <div className="border-primary-muted group-hover:border-primary-vivid absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 group-hover:-top-1 group-hover:-left-1" />
      <div className="border-primary-muted group-hover:border-primary-vivid absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 group-hover:-top-1 group-hover:-right-1" />
      <div className="border-primary-muted group-hover:border-primary-vivid absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 group-hover:-bottom-1 group-hover:-left-1" />
      <div className="border-primary-muted group-hover:border-primary-vivid absolute right-0 bottom-0 h-2 w-2 border-r-2 border-b-2 group-hover:-right-1 group-hover:-bottom-1" />
      {children}
    </>
  )

  //   if (props.to) {
  //     return (
  //       <Link {...(props as InternalLinkProps)} className={baseClassName}>
  //         {content}
  //       </Link>
  //     )
  //   }
  if (typeof props.href === 'string' && props.href.startsWith('http')) {
    return (
      <a {...props} className={baseClassName}>
        {content}
      </a>
    )
  }

  return (
    <a
      {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      className={baseClassName}
    >
      {content}
    </a>
  )
}

export { CyberCard as Card }
