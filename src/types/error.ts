export interface ClerkError {
  code: string
  message: string
  longMessage?: string
  meta?: Record<string, unknown>
}

export interface AuthError {
  message: string
  code?: string
  field?: string
}

export interface ValidationError {
  field: string
  message: string
  code: string
}

export type ErrorType = 'validation' | 'authentication' | 'network' | 'unknown'

export interface ProcessedError {
  type: ErrorType
  message: string
  field?: string
  code?: string
  originalError?: unknown
}