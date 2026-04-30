/**
 * Merges class names, filtering out falsy values.
 * Usage: cn('base', isActive && 'active', className)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
