#

##

[build]

[pull]
we have the template part in button.tsx with server components for [vDOM] updates. I don't know about about the [window] set up w user evts. the gracefull [fetch] from the model which is revalidated and [token-managed] in data layer (lib). we fetch like if it was batch based. we basically [filter] for slug in url instead that is connected to window. Looking at the RFC 9110 we can see that for a frontend engineer that consider [bandwidth]. it is govern by uh protocols. the content negotation is the challanging part.
[push]
ctrl by id [vdom] menuItem in head and post in page. the slug can filter.

### frontend side webb component from repository or registry

- what considerations about the content to be displayed
- what type of components and how are they delivered on a blog
- the interactive parts

#### have card, container, and widget

- hydration is not considered, only static and dynamic blocks. the content is conserned with linking with respect to host.

- they render the post slug from the static page

page.tsx

- hydration id

```tsx
import {registry} from '@/app/registry'
import {Card} from '@/components/shared/Card'

 {posts.map((post: Post, index: number) => {
            const definition = registry[params.slug]

            if (!definition) {
              return <div>Component not found</div>
            }

            return (
              <article className="w-72" key={post.databaseId}>
{
  /**
   * card with props
   * */
}*
   {components.map((component) => (
                  <Card
                    key={component.slug}
                    to={`/components/${component.slug}`}
                    className="p-0"
                  >
                    <div className="flex flex-col">
                      <h3 className="text-primary-vivid group-hover:text-primary-accent border-primary-muted/20 truncate border-b p-4 font-mono text-xl font-medium">
                        {`<${component.name} />`}
                      </h3>

                      <div className="bg-app-muted/5 relative flex h-64 items-center justify-center overflow-hidden">
                        <div className="pointer-events-none scale-90 transform">
                          <component.component {...component.defaultProps} />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                <Link href={`/blog/${post.slug}`}>
                  <h2 dangerouslySetInnerHTML={{__html: post.title ?? ''}} />
```

registry.tsx

```tsx
@ -0,0 +1,125 @@
import {Button} from '@/components/shared/Button'
// import { TextField, type TextFieldProps } from "~/components/text-field"
// import { Checkbox } from "~/components/checkbox"
// import { RadioGroup, Radio } from "~/components/radio-group"
// import { Select, SelectItem } from "~/components/select"
import {Breadcrumb, Breadcrumbs} from '@/app/components/breadcrumbs'
import {Link} from '@/components/link'
// import { TagGroup, Tag } from "~/components/tag-group"

// import { Tree, TreeItem } from "~/components/tree"

import type {ComponentType} from 'react'

export type ControlType = 'select' | 'boolean' | 'text'

export interface ControlDef {
  type: ControlType
  label?: string
  options?: string[]
  description?: string
}

export interface ComponentDefinition<P = any> {
  name: string
  description: string
  component: ComponentType<P>
  controls: Record<keyof P | string, ControlDef>
  defaultProps?: Partial<P>
}

export const registry: Record<string, ComponentDefinition> = {
  button: {
    name: 'Button',
    description:
      'Initiates a discrete execution sequence. Triggers an event handler upon strictly defined interaction parameters.',
    component: Button,
    defaultProps: {
      children: 'Execute',
      variant: 'primary',
      isDisabled: false,
      isPending: false
    },
    controls: {
      variant: {
        type: 'select',
        options: ['primary', 'secondary', 'destructive', 'quiet']
      },
      isDisabled: {type: 'boolean'},
      isPending: {type: 'boolean'},
      children: {type: 'text', label: 'Label'}
    }
  },
  link: {
    name: 'Link',
    description:
      'Hypertext reference pointer. Redirects the user agent to a specified URI resource.',
    component: Link,
    defaultProps: {
      children: '/sys/logs',
      variant: 'primary',
      href: '#',
      isDisabled: false
    },
    controls: {
      children: {type: 'text'},
      variant: {
        type: 'select',
        options: ['primary', 'secondary']
      },
      isDisabled: {type: 'boolean'}
    }
  },
  breadcrumbs: {
    name: 'Breadcrumbs',
    description:
      'Hierarchical navigation trail. Visualizes the current location within the directory structure or state machine.',
    component: Breadcrumbs,
    defaultProps: {
      children: (
        <>
          <Breadcrumb href="#">root</Breadcrumb>
          <Breadcrumb href="#">system</Breadcrumb>
          <Breadcrumb>config</Breadcrumb>
        </>
      )
    },
    controls: {
      isDisabled: {type: 'boolean'}
    }
  }
  //  tree: {
  //   name: "Tree",
  //   description:
  //     "Recursive data structure visualization. Displays nested nodes and leaves in a collapsible hierarchy.",
  //   component: Tree,
  //   defaultProps: {
  //     aria_label: "Files",
  //     selectionMode: "multiple",
  //     children: (
  //       <>
  //         <TreeItem id="src" title="src">
  //           <TreeItem id="components" title="components">
  //             <TreeItem id="button" title="button.tsx" />
  //             <TreeItem id="input" title="input.tsx" />
  //           </TreeItem>
  //           <TreeItem id="hooks" title="hooks">
  //             <TreeItem id="use-auth" title="use-auth.ts" />
  //           </TreeItem>
  //         </TreeItem>
  //         <TreeItem id="public" title="public">
  //           <TreeItem id="robots" title="robots.txt" />
  //           <TreeItem id="favicon" title="favicon.ico" />
  //         </TreeItem>
  //       </>
  //     ),
  //   },
  // controls: {
  //   aria_label: { type: "text", label: "Aria Label" },
  //   selectionMode: {
  //     type: "select",
  //     options: ["none", "single", "multiple"],
  //   },
  // },
  // },
}
```

#### challange

- child template, card props , link mostly css

Button.tsx

```tsx
@ -0,0 +1,89 @@
import type {ReactNode} from 'react'
// import {Link, type LinkProps} from 'react-router'
// import Icon from '../icons/icon'
// import type {IconType} from './icons-map'
import React from 'react'
export type DisabledProp =
  | boolean
  | {
      title?: string
      reason: ReactNode | string
    }

export interface CommonButtonProps {
  className?: string
  error?: string
  hideErrorText?: boolean
  children?: ReactNode
  disabled?: DisabledProp
  /**
   * Accessible label for the button. Only required for icon-only buttons.
   * Buttons with text children automatically use the text as the accessible name.
   * If both label and text children are present, the text children take precedence.
   */
  label?: string
  id?: string // Add id as an optional prop since some buttons might need it
  // icon?: IconType
}
export interface LinkButtonProps
  extends
    CommonButtonProps,
    Omit<LinkProps, keyof CommonButtonProps | 'disabled'> {
  as?: typeof Link
  to: string
  target?: string
  prefetch?: 'none' | 'intent' | 'render' | 'viewport'
}

type ButtonProps = {
  children: React.ReactNode
} & (
  | {
      variant: 'button'
      onClick: () => void
      disabled?: boolean
    }
  | {
      variant: 'link'
      href: string
      target?: '_blank' | '_self'
    }
  | {
      variant: 'submit'
      form?: string
      disabled?: boolean
    }
)

//   function isLinkProps(props: ButtonProps): props is LinkButtonProps {
//   return "to" in props;
// }

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (props, ref) => {
    const {children} = props

    switch (props.variant) {
      case 'button':
        return (
          <button onClick={props.onClick} disabled={props.disabled}>
            {children}
          </button>
        )

      case 'link':
        return (
          <a href={props.href} target={props.target}>
            {children}
          </a>
        )

      case 'submit':
        return (
          <button type="submit" form={props.form} disabled={props.disabled}>
            {children}
          </button>
        )
    }
  }
)
```

Card.tsx

```tsx
@ -0,0 +1,66 @@
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
```

Link.tsx

```tsx

```

####

Button.tsx

```tsx
@ -0,0 +1,89 @@
import type {ReactNode} from 'react'
// import {Link, type LinkProps} from 'react-router'
// import Icon from '../icons/icon'
// import type {IconType} from './icons-map'
import React from 'react'
export type DisabledProp =
  | boolean
  | {
      title?: string
      reason: ReactNode | string
    }

export interface CommonButtonProps {
  className?: string
  error?: string
  hideErrorText?: boolean
  children?: ReactNode
  disabled?: DisabledProp
  /**
   * Accessible label for the button. Only required for icon-only buttons.
   * Buttons with text children automatically use the text as the accessible name.
   * If both label and text children are present, the text children take precedence.
   */
  label?: string
  id?: string // Add id as an optional prop since some buttons might need it
  // icon?: IconType
}
export interface LinkButtonProps
  extends
    CommonButtonProps,
    Omit<LinkProps, keyof CommonButtonProps | 'disabled'> {
  as?: typeof Link
  to: string
  target?: string
  prefetch?: 'none' | 'intent' | 'render' | 'viewport'
}

type ButtonProps = {
  children: React.ReactNode
} & (
  | {
      variant: 'button'
      onClick: () => void
      disabled?: boolean
    }
  | {
      variant: 'link'
      href: string
      target?: '_blank' | '_self'
    }
  | {
      variant: 'submit'
      form?: string
      disabled?: boolean
    }
)

//   function isLinkProps(props: ButtonProps): props is LinkButtonProps {
//   return "to" in props;
// }

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (props, ref) => {
    const {children} = props

    switch (props.variant) {
      case 'button':
        return (
          <button onClick={props.onClick} disabled={props.disabled}>
            {children}
          </button>
        )

      case 'link':
        return (
          <a href={props.href} target={props.target}>
            {children}
          </a>
        )

      case 'submit':
        return (
          <button type="submit" form={props.form} disabled={props.disabled}>
            {children}
          </button>
        )
    }
  }
)
```

###

```sh
pnpm add use-debounce
```

###

https://medium.com/@echernicky/setting-up-a-local-wp-wsl-ubuntu-environment-9e7bdc6e9dbd

next.config.ts

```ts
import path from 'path'
const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingRoot: path.join(__dirname),
```
