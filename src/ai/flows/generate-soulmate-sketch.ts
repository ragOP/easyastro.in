'use server';

/**
 * @fileOverview Generates a soulmate sketch based on user details.
 *
 * - generateSoulmateSketch - A function that handles the soulmate sketch generation process.
 * - GenerateSoulmateSketchInput - The input type for the generateSoulmateSketch function.
 * - GenerateSoulmateSketchOutput - The return type for the generateSoulmateSketch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSoulmateSketchInputSchema = z.object({
  name: z.string().describe('Your name.'),
  birthDate: z.string().describe('Your birth date (e.g., YYYY-MM-DD).'),
  details: z.string().describe('Additional personal details.'),
});
export type GenerateSoulmateSketchInput = z.infer<typeof GenerateSoulmateSketchInputSchema>;

const GenerateSoulmateSketchOutputSchema = z.object({
  sketchDataUri: z
    .string()
    .describe(
      'A soulmate sketch, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
  reading: z.string().describe('A psychic reading based on astrological information.'),
});
export type GenerateSoulmateSketchOutput = z.infer<typeof GenerateSoulmateSketchOutputSchema>;

export async function generateSoulmateSketch(input: GenerateSoulmateSketchInput): Promise<GenerateSoulmateSketchOutput> {
  return generateSoulmateSketchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSoulmateSketchPrompt',
  input: {schema: GenerateSoulmateSketchInputSchema},
  output: {schema: GenerateSoulmateSketchOutputSchema},
  prompt: `You are a psychic artist who specializes in creating soulmate sketches based on a person's details.

  Based on the following information, generate a sketch of the person's soulmate and provide a psychic reading.

  Name: {{{name}}}
  Birth Date: {{{birthDate}}}
  Details: {{{details}}}

  Sketch (as data URI): {{media url=sketchDataUri}}
  Reading: {{reading}}
  
  Return the sketch as a data URI and the psychic reading in the output.
  `,
});

const generateSoulmateSketchFlow = ai.defineFlow(
  {
    name: 'generateSoulmateSketchFlow',
    inputSchema: GenerateSoulmateSketchInputSchema,
    outputSchema: GenerateSoulmateSketchOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Create a soulmate sketch for ${input.name}, born on ${input.birthDate}, with these details: ${input.details}.`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });

    const readingResponse = await ai.generate({
      prompt: `Provide a psychic reading based on astrological information for ${input.name}, born on ${input.birthDate}, with these details: ${input.details}.`,
    });

    return {
      sketchDataUri: media.url,
      reading: readingResponse.text,
    };
  }
);
