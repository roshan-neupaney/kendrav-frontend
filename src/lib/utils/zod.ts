// src/lib/utils/zod.ts
import type { ZodError } from 'zod';

export function formatErrors(error: ZodError): Record<string, string> {
    const errors: Record<string, string> = {};
    for (const issue of error.issues) {
        const field = issue.path[0] as string;
        if (!errors[field]) errors[field] = issue.message;
    }
    return errors;
}