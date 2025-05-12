// src/lib/schemas/appointment.ts
import { z } from 'zod';

// Define the phone validation function separately
const isValidPhone = (val: string | undefined): boolean => {
  // If the value is optional and not provided, it's valid.
  if (val === undefined || val === null || val === "") {
      return true;
  }
  // Basic regex: allows digits, spaces, hyphens, parentheses, optional leading +.
  // Requires at least 7 digits after stripping formatting characters.
  const strippedVal = val.replace(/[\s-()]/g, '');
  // Allow empty string after stripping if the original was just formatting chars.
  if (strippedVal.length === 0) return true;
  // Test for common patterns, ensure minimum length
  return /^\+?\d{7,}$/.test(strippedVal);
};


export const AppointmentFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional().refine(isValidPhone, {
    message: "Please enter a valid phone number or leave empty.", // Updated message
  }),
  service: z.string().optional(),
  preferredDate: z.coerce.date({ // Using z.coerce.date for better handling from form data
      errorMap: (issue, ctx) => {
          if (issue.code === z.ZodIssueCode.invalid_date) {
              return { message: 'Please select a valid date.' };
          }
          // Allow optional field by not returning an error if it's initially null/undefined
           if (issue.code === z.ZodIssueCode.invalid_type && (issue.received === 'null' || issue.received === 'undefined')) {
               // This case might not be needed with .optional() below, but kept for robustness
               return { message: ''}; // Suppress error message for initial empty state
           }
          return { message: ctx.defaultError };
      },
  }).optional(), // Make the date explicitly optional at the schema level
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message cannot exceed 500 characters." }),
});

export type AppointmentFormData = z.infer<typeof AppointmentFormSchema>;
