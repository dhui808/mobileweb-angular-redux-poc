import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IMfaQuestionState } from '../state/mfa.state';

const selectMfaQuestionState = (state: IAppState) => state.mfaQuestion;

export const selectMfaQuestion = createSelector(
  selectMfaQuestionState,
  (state: IMfaQuestionState) => state.question
);

