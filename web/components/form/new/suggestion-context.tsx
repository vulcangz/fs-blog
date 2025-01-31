import { createContext } from 'react';
import { EditPost } from '@/interfaces';

export type SuggestionField = {
  name: Exclude<keyof EditPost, 'coverImage'>;
  y: number;
} | null;

export type SuggestionContextType = {
  suggestionField: SuggestionField;
  setSuggestionField: (field: SuggestionField) => void;
};

export const NewSuggestionContext = createContext<SuggestionContextType>({
  suggestionField: null,
  setSuggestionField: (_: SuggestionField) => {}
});
