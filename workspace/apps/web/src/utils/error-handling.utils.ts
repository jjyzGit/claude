import {ErrorCode} from '@sollapay/enums';
import {HttpClientError} from '@sollapay/http-client';

/**
 * Extract error message from various error types
 * Handles Error objects, HttpClientError, and unknown error types
 *
 * @param error - The error to extract message from
 * @param fallback - Fallback message if error message cannot be extracted
 * @returns Error message string
 */
export function getErrorMessage(error: unknown, fallback = 'An error occurred'): string {
  if (error instanceof HttpClientError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return fallback;
}

/**
 * Check if error is an HttpClientError
 */
export function isHttpClientError(error: unknown): error is HttpClientError {
  return error instanceof HttpClientError;
}

/**
 * Get status code from HttpClientError
 * Returns undefined for non-HTTP errors
 */
export function getErrorStatusCode(error: unknown): number | undefined {
  if (isHttpClientError(error)) {
    return error.statusCode;
  }
  return undefined;
}

/**
 * Get error code from HttpClientError
 * Returns undefined for non-HTTP errors
 */
export function getErrorCode(error: unknown): string | undefined {
  if (isHttpClientError(error)) {
    return error.code;
  }
  return undefined;
}

/**
 * Get error details from HttpClientError
 * Returns undefined for non-HTTP errors
 */
export function getErrorDetails(error: unknown): unknown | undefined {
  if (isHttpClientError(error)) {
    return error.details;
  }
  return undefined;
}

/**
 * Format HTTP error for display
 * Provides a user-friendly error message with additional context
 *
 * @param error - The error to format
 * @param prefix - Optional prefix to add to the error message
 * @returns Formatted error message
 */
export function formatHttpError(error: unknown, prefix?: string): string {
  const message = getErrorMessage(error);
  const statusCode = getErrorStatusCode(error);

  let formattedMessage = message;

  if (statusCode) {
    formattedMessage = `${message} (${statusCode})`;
  }

  if (prefix) {
    return `${prefix}: ${formattedMessage}`;
  }

  return formattedMessage;
}

/**
 * Check if error is a network error (no status code)
 */
export function isNetworkError(error: unknown): boolean {
  if (isHttpClientError(error)) {
    return error.statusCode === undefined;
  }
  return false;
}

/**
 * Check if error is an authentication error (401)
 */
export function isAuthError(error: unknown): boolean {
  return getErrorStatusCode(error) === 401;
}

/**
 * Check if error is a forbidden error (403)
 */
export function isForbiddenError(error: unknown): boolean {
  return getErrorStatusCode(error) === 403;
}

/**
 * Check if error is a not found error (404)
 */
export function isNotFoundError(error: unknown): boolean {
  return getErrorStatusCode(error) === 404;
}

/**
 * Check if error is a validation error (400 or 422)
 */
export function isValidationError(error: unknown): boolean {
  const statusCode = getErrorStatusCode(error);
  return statusCode === 400 || statusCode === 422;
}

/**
 * Check if error is a server error (5xx)
 */
export function isServerError(error: unknown): boolean {
  const statusCode = getErrorStatusCode(error);
  return statusCode !== undefined && statusCode >= 500 && statusCode < 600;
}

interface ZodFieldIssue {
  field?: string;
  code?: string;
  message?: string;
}

/**
 * Returns translated error messages as an array for display in form Alerts.
 *
 * - VALIDATION_ERROR with Zod details → one message per field: "{fieldLabel} {zodErrorReason}"
 * - Other ErrorCode values → single-item array with common:errors.{CODE} translation
 * - Fallback → single-item array with raw error message or common:errors.default
 */
export function getTranslatedErrorMessages(
  error: unknown,
  t: (key: string, options?: Record<string, string>) => string
): string[] {
  const code = getErrorCode(error);

  if (code === ErrorCode.BUYER_VALIDATION_ERROR) {
    const details = getErrorDetails(error);
    if (Array.isArray(details) && details.length > 0) {
      const messages = (details as {code: string; params?: Record<string, string | number>}[]).map(
        issue =>
          t(`common:buyerValidation.${issue.code}`, {
            defaultValue: issue.code,

            ...(issue.params ?? {})
          })
      );
      if (messages.length > 0) return messages;
    }
  }

  if (code === ErrorCode.VALIDATION_ERROR) {
    const details = getErrorDetails(error);
    if (Array.isArray(details) && details.length > 0) {
      const messages = (details as ZodFieldIssue[])
        .map(issue => {
          const fieldLabel = issue.field
            ? t(`common:fieldLabels.${issue.field}`, {defaultValue: issue.field})
            : undefined;
          const reason = issue.code
            ? t(`common:zodErrors.${issue.code}`, {defaultValue: issue.message ?? 'is invalid'})
            : (issue.message ?? 'is invalid');
          return fieldLabel ? `${fieldLabel} ${reason}` : reason;
        })
        .filter(Boolean);
      if (messages.length > 0) return messages;
    }
  }

  if (code) {
    const translated = t(`common:errors.${code}`, {defaultValue: ''});
    if (translated) return [translated];
  }

  return [
    getErrorMessage(
      error,
      t('common:errors.default', {defaultValue: 'Something went wrong. Please try again.'})
    )
  ];
}

/**
 * Returns a single translated error message for display in form Alerts.
 * Multiple validation errors are joined with '. '.
 */
export function getTranslatedErrorMessage(
  error: unknown,
  t: (key: string, options?: Record<string, string>) => string
): string {
  return getTranslatedErrorMessages(error, t).join('. ');
}
