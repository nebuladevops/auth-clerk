import { ClerkError, AuthError, ValidationError, ProcessedError, ErrorType } from '@/types/error'

class ErrorService {
  private static instance: ErrorService
  
  public static getInstance(): ErrorService {
    if (!ErrorService.instance) {
      ErrorService.instance = new ErrorService()
    }
    return ErrorService.instance
  }

  public processError(error: unknown): ProcessedError {
    if (this.isClerkError(error)) {
      return this.handleClerkError(error)
    }
    
    if (this.isAuthError(error)) {
      return this.handleAuthError(error)
    }
    
    if (this.isValidationError(error)) {
      return this.handleValidationError(error)
    }
    
    return this.handleGenericError(error)
  }

  private isClerkError(error: unknown): error is { errors: ClerkError[] } {
    return (
      typeof error === 'object' &&
      error !== null &&
      'errors' in error &&
      Array.isArray((error as { errors: unknown }).errors)
    )
  }

  private isAuthError(error: unknown): error is AuthError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as AuthError).message === 'string'
    )
  }

  private isValidationError(error: unknown): error is ValidationError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'field' in error &&
      'message' in error &&
      'code' in error
    )
  }

  private handleClerkError(error: { errors: ClerkError[] }): ProcessedError {
    const clerkError = error.errors[0]
    
    if (!clerkError) {
      return this.createProcessedError('unknown', 'Error desconocido')
    }

    const errorType = this.getErrorTypeFromCode(clerkError.code)
    const message = this.getLocalizedMessage(clerkError.code, clerkError.message)
    
    return this.createProcessedError(errorType, message, {
      code: clerkError.code,
      originalError: error
    })
  }

  private handleAuthError(error: AuthError): ProcessedError {
    return this.createProcessedError('authentication', error.message, {
      code: error.code,
      field: error.field,
      originalError: error
    })
  }

  private handleValidationError(error: ValidationError): ProcessedError {
    return this.createProcessedError('validation', error.message, {
      code: error.code,
      field: error.field,
      originalError: error
    })
  }

  private handleGenericError(error: unknown): ProcessedError {
    let message = 'Error inesperado'
    
    if (error instanceof Error) {
      message = error.message || message
    } else if (typeof error === 'string') {
      message = error
    }
    
    return this.createProcessedError('unknown', message, {
      originalError: error
    })
  }

  private getErrorTypeFromCode(code: string): ErrorType {
    if (code.includes('password') || code.includes('auth')) {
      return 'authentication'
    }
    
    if (code.includes('email') || code.includes('validation')) {
      return 'validation'
    }
    
    if (code.includes('network') || code.includes('connection')) {
      return 'network'
    }
    
    return 'unknown'
  }

  private getLocalizedMessage(code: string, defaultMessage: string): string {
    const messageMap: Record<string, string> = {
      'form_password_pwned': 'Esta contraseña ha sido comprometida en una violación de datos. Por favor, elige una contraseña diferente.',
      'form_password_too_common': 'Esta contraseña es demasiado común. Por favor, elige una contraseña más segura.',
      'form_password_length_too_short': 'La contraseña debe tener al menos 8 caracteres.',
      'form_email_invalid_format': 'El formato del correo electrónico no es válido.',
      'form_email_address_taken': 'Este correo electrónico ya está registrado.',
      'form_username_invalid_character': 'El nombre de usuario contiene caracteres no válidos.',
      'form_code_incorrect': 'El código de verificación es incorrecto.',
      'form_identifier_not_found': 'No se encontró una cuenta con este correo electrónico.',
      'session_token_revoked': 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      'captcha_invalid': 'Verificación CAPTCHA fallida. Por favor, inténtalo de nuevo.',
      'captcha_unavailable': 'CAPTCHA no disponible. Por favor, inténtalo más tarde.',
    }
    
    return messageMap[code] || defaultMessage
  }

  private createProcessedError(
    type: ErrorType, 
    message: string, 
    options: { 
      code?: string
      field?: string
      originalError?: unknown 
    } = {}
  ): ProcessedError {
    return {
      type,
      message,
      code: options.code,
      field: options.field,
      originalError: options.originalError
    }
  }

  public logError(processedError: ProcessedError): void {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error processed:', {
        type: processedError.type,
        message: processedError.message,
        code: processedError.code,
        field: processedError.field,
        originalError: processedError.originalError
      })
    }
  }
}

export const errorService = ErrorService.getInstance()