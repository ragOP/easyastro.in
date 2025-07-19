"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  generateSoulmateSketch,
  GenerateSoulmateSketchOutput,
} from "@/ai/flows/generate-soulmate-sketch";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  birthDate: z.date({
    required_error: "Your date of birth is required.",
  }),
  details: z.string().min(10, {
    message: "Please provide a few more details about yourself.",
  }),
});

export default function SoulmateForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateSoulmateSketchOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      details: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const formattedValues = {
        ...values,
        birthDate: format(values.birthDate, "yyyy-MM-dd"),
      };
      const response = await generateSoulmateSketch(formattedValues);
      setResult(response);
    } catch (error) {
      console.error("Error generating sketch:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with our psychics. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg shadow-lg">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h3 className="font-headline text-2xl text-primary mb-2">
          Our psychics are channeling...
        </h3>
        <p className="text-foreground/80">
          Please wait while we create your unique soulmate sketch. This can take a moment.
        </p>
      </div>
    );
  }

  if (result) {
    return (
      <Card className="w-full shadow-xl border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl text-primary flex items-center justify-center gap-2">
             <Sparkles className="h-6 w-6"/> Your Soulmate Awaits!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-headline text-2xl mb-4 text-center">The Sketch</h4>
            <div className="aspect-square relative w-full rounded-lg overflow-hidden border-2 border-primary/50 shadow-inner">
                <Image
                src={result.sketchDataUri}
                alt="Your soulmate sketch"
                fill
                className="object-cover"
                />
            </div>
          </div>
          <div>
            <h4 className="font-headline text-2xl mb-4 text-center">The Reading</h4>
            <div className="p-4 bg-muted rounded-lg text-foreground/90 leading-relaxed italic border-l-4 border-accent">
              {result.reading}
            </div>
          </div>
           <Button onClick={() => setResult(null)} className="w-full" variant="outline">
            Start Over
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full p-2 sm:p-6 shadow-lg bg-card border-primary/10">
      <CardContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Priya" {...field} className="py-6"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-lg">Your Birth Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal py-6",
                            !field.value && "text-muted-foreground"
                          )}
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
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1930-01-01")
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
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Personal Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little about yourself, your personality, or your relationship preferences..."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This helps our psychics connect with your energy.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full font-bold text-lg py-7">
              Reveal My Soulmate Now
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
