// src/app/actions.ts
"use server";

import { recommendServices, type RecommendationInput, type RecommendationOutput } from '@/ai/flows/ai-service-recommendation';
import { AppointmentFormData, AppointmentFormSchema } from '@/lib/schemas/appointment'; // Import schema and type
import { z } from 'zod';


export async function getAiRecommendationsAction(userInput: string): Promise<RecommendationOutput> {
  if (!userInput.trim()) {
    return { recommendedServices: ["Please describe your needs to get a recommendation."] };
  }
  try {
    const input: RecommendationInput = { needs: userInput };
    // console.log("Sending to AI:", input); // For debugging
    const result = await recommendServices(input);
    // console.log("Received from AI:", result); // For debugging
    return result;
  } catch (error) {
    console.error("Error in AI recommendation action:", error);
    return { recommendedServices: ["Sorry, an error occurred while fetching recommendations. Please try again later."] };
  }
}


interface SubmitAppointmentResult {
  success: boolean;
  message: string;
  errors?: z.ZodIssue[];
}

export async function submitAppointmentRequestAction(data: AppointmentFormData): Promise<SubmitAppointmentResult> {
  const validationResult = AppointmentFormSchema.safeParse(data);

  if (!validationResult.success) {
    console.error("Validation Errors:", validationResult.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Validation failed. Please check your input.",
      errors: validationResult.error.issues,
    };
  }

  // In a real app, you'd save this to a database, send an email, etc.
  console.log("Appointment Request Received:", validationResult.data);

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate potential error
  // if (Math.random() > 0.8) {
  //   return { success: false, message: "An unexpected error occurred on the server. Please try again." };
  // }

  return { success: true, message: "Appointment request submitted successfully! We will contact you soon." };
}
