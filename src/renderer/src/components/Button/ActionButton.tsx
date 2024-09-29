import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = ({ className, children, ...props }: ActionButtonProps) => {
  return (
    <button
      className={twMerge(
        'border-none rounded-md p-1 bg-transparent first:hover:bg-[#ff0000] first:active:bg-[#900000] hover:bg-[#F57F00] active:bg-[#9c5101] transition-colors duration-100'
      )}
      {...props}
    >
      {children}
    </button>
  )
}
