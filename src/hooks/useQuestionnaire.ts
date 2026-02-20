import { useMutation } from '@tanstack/react-query';
import { submitQuestionnaire } from '@/services/api';
import type { QuestionnaireSubmissionInsert } from '@/types/database';

export function useSubmitQuestionnaire() {
  return useMutation({
    mutationFn: (data: QuestionnaireSubmissionInsert) => submitQuestionnaire(data),
  });
}
