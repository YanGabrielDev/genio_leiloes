import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react' // Import new icons

import { cn } from '@/lib/utils'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-3', // Added gap for spacing between multiple toasts
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center space-x-4 overflow-hidden rounded-lg border p-5 pr-8 shadow-xl transition-all duration-300 ease-out ' + // Increased padding, rounded corners, shadow, and transition
    'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none ' +
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out ' +
    'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full ' +
    'data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default:
          'bg-white text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700',
        destructive: 'bg-red-600 text-white border-red-700', // Darker red, white text
        success: 'bg-green-600 text-white border-green-700', // Darker green, white text
        info: 'bg-blue-600 text-white border-blue-700', // New info variant
        warning: 'bg-yellow-500 text-gray-900 border-yellow-600', // New warning variant
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Add new prop for icon
type ToastIconProps = {
  icon?: React.ReactNode
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> &
    ToastIconProps // Include icon prop type
>(({ className, variant, icon, children, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      {/* Icon before content */}
      {icon && <div className="flex-shrink-0">{icon}</div>}

      {/* Original children */}
      {children}
    </ToastPrimitives.Root>
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-9 shrink-0 items-center justify-center rounded-md border text-sm font-medium transition-colors duration-200 ' +
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background ' + // Improved focus ring
        'bg-transparent hover:bg-opacity-20 hover:bg-current ' + // Subtle hover effect using 'current' color
        'group-[.destructive]:border-red-400 group-[.destructive]:hover:bg-red-500 group-[.destructive]:focus:ring-red-400 ' +
        'group-[.success]:border-green-400 group-[.success]:hover:bg-green-500 group-[.success]:focus:ring-green-400 ' +
        'group-[.info]:border-blue-400 group-[.info]:hover:bg-blue-500 group-[.info]:focus:ring-blue-400 ' +
        'group-[.warning]:border-yellow-400 group-[.warning]:hover:bg-yellow-600 group-[.warning]:focus:ring-yellow-400 ' +
        'disabled:pointer-events-none disabled:opacity-50', // Slightly more subdued disabled state
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-full p-1.5 opacity-0 transition-opacity duration-200 hover:bg-black/10 dark:hover:bg-white/10 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 ' + // Larger clickable area, rounded, and subtle hover
        'text-white/80 group-hover:opacity-100 ' + // Default close icon color, always visible on group hover
        'group-[.destructive]:text-red-100 group-[.destructive]:hover:bg-red-700/50 group-[.destructive]:focus:ring-red-300 ' +
        'group-[.success]:text-green-100 group-[.success]:hover:bg-green-700/50 group-[.success]:focus:ring-green-300 ' +
        'group-[.info]:text-blue-100 group-[.info]:hover:bg-blue-700/50 group-[.info]:focus:ring-blue-300 ' +
        'group-[.warning]:text-yellow-900 group-[.warning]:hover:bg-yellow-600/50 group-[.warning]:focus:ring-yellow-300',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-base font-bold [&+div]:text-sm', className)} // Larger, bolder title
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90 leading-relaxed', className)} // Slightly more relaxed line height
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
