// src/components/sections/AppointmentSection.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { submitAppointmentRequestAction } from "@/app/actions";
import { AppointmentFormData, AppointmentFormSchema } from '@/lib/schemas/appointment'; // Import schema and type
import { servicesData } from "./ServicesSection"; // Import services data
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

function AppointmentForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(AppointmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      // preferredDate will be undefined initially, which is handled by the schema
    },
  });

 useEffect(() => {
    // Check for service query parameter to pre-select service
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const serviceFromQuery = queryParams.get('service');
      if (serviceFromQuery) {
        const matchedService = servicesData.find(s => s.name === decodeURIComponent(serviceFromQuery));
        if (matchedService) {
          form.setValue('service', matchedService.name);
          setSelectedService(matchedService.name);
        }
      }
    }
  }, [form]);


  async function onSubmit(data: AppointmentFormData) {
    setIsSubmitting(true);
    try {
      // Ensure optional fields that are empty strings are converted to undefined if necessary
      // Zod coerce handles date conversion, but let's ensure empty strings for optional text fields are handled if needed
      const preparedData = {
        ...data,
        phone: data.phone || undefined,
        service: data.service || undefined,
        // preferredDate is handled by coerce.date().optional()
      };

      const result = await submitAppointmentRequestAction(preparedData);
      if (result.success) {
        toast({
          title: "Request Submitted!",
          description: result.message,
          variant: "default",
        });
        form.reset({ // Reset with default values (clears the form)
             name: "",
             email: "",
             phone: "",
             service: "",
             preferredDate: undefined, // Explicitly reset date
             message: "",
           });
        setSelectedService(undefined); // Reset selected service state as well
      } else {
        if (result.errors) {
          // Clear previous errors before setting new ones
           form.clearErrors();
           result.errors.forEach(err => {
            // Handle potential path issues (e.g., if error is nested)
             const fieldName = err.path[0] as keyof AppointmentFormData;
             if (fieldName) {
                form.setError(fieldName , { message: err.message });
             } else {
                console.warn("Error without specific field:", err);
             }
           });
           toast({
            title: "Validation Error",
            description: result.message || "Please check the form for errors.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Submission Failed",
            description: result.message || "An unexpected error occurred.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
        console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during submission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold text-primary">Request an Appointment</CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill out the form below, and we'll contact you to confirm your booking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., jane.doe@example.com" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    {/* Ensure the field value is treated as string, handle potential null/undefined */}
                    <Input type="tel" placeholder="e.g., (123) 456-7890" {...field} value={field.value ?? ''} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Service (Optional)</FormLabel>
                  {/* Ensure value passed to Select is either a valid string or undefined */}
                  <Select onValueChange={(value) => { field.onChange(value || undefined); setSelectedService(value || undefined);}} value={selectedService || field.value || ''} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {servicesData.map(service => (
                        <SelectItem key={service.id} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Date (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isSubmitting}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange} // RHF handles the value conversion
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0,0,0,0)) // Disable past dates (including today)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message / Specific Needs</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a bit more about your needs or any specific requests."
                      rows={4}
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Send Request'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}


export default function AppointmentSection() {
  return (
    <section id="appointment" className="bg-accent/20">
      <div className="container mx-auto">
        <AppointmentForm />
      </div>
    </section>
  );
}
