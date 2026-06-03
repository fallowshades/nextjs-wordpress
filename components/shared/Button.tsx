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
export interface LinkButtonProps extends CommonButtonProps {
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

Button.displayName = 'Button'
