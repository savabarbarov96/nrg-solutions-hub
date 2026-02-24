import { useMutation } from '@tanstack/react-query';
import { submitQuestionnaire } from '@/services/api';
import type { QuestionnaireSubmissionInsert } from '@/types/database';

export function useSubmitQuestionnaire() {
  return useMutation({
    mutationFn: (params: { data: QuestionnaireSubmissionInsert; image?: File }) =>
      submitQuestionnaire(params.data, params.image),
  });
}
