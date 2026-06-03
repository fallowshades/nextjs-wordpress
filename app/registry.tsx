import {Button} from '@/components/shared/Button'
// import { TextField, type TextFieldProps } from "~/components/text-field"
// import { Checkbox } from "~/components/checkbox"
// import { RadioGroup, Radio } from "~/components/radio-group"
// import { Select, SelectItem } from "~/components/select"
import {Breadcrumb, Breadcrumbs} from '@/app/components/breadcrumbs'
import {Link} from '@/components/shared/Link'
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
