// src/components/sections/AiRecommenderSection.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { getAiRecommendationsAction } from '@/app/actions';
import { ScrollArea } from '@/components/ui/scroll-area';

function AiRecommenderForm() {
  const [needs, setNeeds] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!needs.trim()) {
      setError("Please describe your needs or concerns.");
      setRecommendations([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const result = await getAiRecommendationsAction(needs);
      if (result.recommendedServices && result.recommendedServices.length > 0) {
        if(result.recommendedServices[0].startsWith("Error:") || result.recommendedServices[0].startsWith("Sorry,")) {
          setError(result.recommendedServices[0]);
          setRecommendations([]);
        } else {
          setRecommendations(result.recommendedServices);
        }
      } else {
        setError("No recommendations found for your input. Please try rephrasing your needs.");
        setRecommendations([]);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setRecommendations([]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
          <Wand2 className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-semibold text-foreground">Find Your Perfect Treatment</CardTitle>
        <CardDescription className="text-muted-foreground">
          Describe your concerns or desired outcomes, and our AI will suggest suitable services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            placeholder="e.g., 'I want to reduce fine lines and improve skin texture' or 'I'm looking for relaxation and stress relief'"
            value={needs}
            onChange={(e) => setNeeds(e.target.value)}
            rows={4}
            className="focus:ring-primary focus:border-primary"
            disabled={isLoading}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Recommendations...
              </>
            ) : (
              'Get AI Suggestion'
            )}
          </Button>
        </form>
      </CardContent>
      {(recommendations.length > 0 || error) && (
        <CardFooter className="flex flex-col items-start space-y-4 pt-4 border-t">
          {error && (
            <div className="flex items-center space-x-2 text-destructive p-3 bg-destructive/10 rounded-md w-full">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}
          {recommendations.length > 0 && !error && (
            <>
              <h3 className="text-lg font-semibold text-foreground">Recommended Services:</h3>
              <ScrollArea className="h-40 w-full rounded-md border p-3 bg-muted/50">
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

export default function AiRecommenderSection() {
  return (
    <section id="ai-recommender" className="bg-accent/20">
      <div className="container mx-auto">
        <AiRecommenderForm />
      </div>
    </section>
  );
}
