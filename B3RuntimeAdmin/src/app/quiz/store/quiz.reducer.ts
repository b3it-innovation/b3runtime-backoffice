import { Action } from '@ngrx/store';
import * as routerActions from 'app/core/store/router/app-router.action';

import { QuizActions } from './quiz.actions';
import { quizInitialState, QuizState } from './quiz.state';

export function reducer(
  state = quizInitialState,
  action: Action & { payload?: any }): QuizState {
    console.log(action);
  switch (action.type) {

    case QuizActions.Types.ADD_CATEGORY: {
      return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          addCategory: {
            isLoading: true,
            isSuccess: false,
            action: QuizActions.Types.ADD_CATEGORY
          }
        })
      })
    }

    case QuizActions.Types.ADD_CATEGORY_SUCCESS: {
      return Object.assign({}, state, {
        categories: [...state.categories, action.payload.category],
        loadingStates: Object.assign({}, state.loadingStates, {
          addCategory: {
            isLoading: false,
            isSuccess: true,
            action: QuizActions.Types.ADD_CATEGORY
          }
        })
      })
    }

    case QuizActions.Types.DRAG_QUESTION: {
        return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          dragQuestion: {
            isLoading: true,
            isSuccess: false,
            action: QuizActions.Types.DRAG_QUESTION
          }
        })
      })
    }


    case QuizActions.Types.DROP_QUESTION_SUCCESS: {
      state.draggedQuestion = action.payload;
      return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          dragQuestion: {
            isLoading: false,
            isSuccess: true,
            action: QuizActions.Types.DROP_QUESTION_SUCCESS
          }
        })
      })
    }

    case QuizActions.Types.DELETE_CATEGORY_SUCCESS: {
      return Object.assign({}, state, {
        categories: state.categories.filter((item) => (action.payload.category.key !== item.key)),
      })
    }

    case QuizActions.Types.GET_CATEGORIES: {
      return Object.assign({}, state, {
        categories: [],
        loadingStates: Object.assign({}, state.loadingStates, {
          getCategories: {
            isLoading: true,
            isSuccess: false,
            action: QuizActions.Types.GET_CATEGORIES
          }
        })
      })
    }

    case QuizActions.Types.GET_CATEGORIES_SUCCESS: {
      return Object.assign({}, state, {
        categories: action.payload.categories,
        loadingStates: Object.assign({}, state.loadingStates, {
          getCategories: {
            isLoading: false,
            isSuccess: true,
            action: QuizActions.Types.GET_CATEGORIES
          }
        })
      })
    }

    case QuizActions.Types.ADD_QUESTION: {
      return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          addQuestion: {
            isLoading: true,
            isSuccess: false,
            action: QuizActions.Types.ADD_QUESTION
          }
        })
      })
    }

    case QuizActions.Types.ADD_QUESTION_SUCCESS: {
      return Object.assign({}, state, {
        loadingStates: Object.assign({}, state.loadingStates, {
          addQuestion: {
            isLoading: false,
            isSuccess: true,
            action: QuizActions.Types.ADD_QUESTION
          }
        })
      })
    }

    case QuizActions.Types.SELECT_QUESTION: {
      state.selectedQuestion = action.payload.question;
      return Object.assign({}, state, {
        question: action.payload.question,
        loadingStates: Object.assign({}, state.loadingStates, {
          selectQuestion: {
            isLoading: true,
            isSuccess: false,
            action: QuizActions.Types.SELECT_QUESTION
          }
        })
      })
    }
    case QuizActions.Types.DELETE_QUESTION_SUCCESS: {
      return Object.assign({}, state, {

      })
    }

    case QuizActions.Types.GET_QUESTIONS: {
      return Object.assign({}, state, {
        questions: [],
        loadingStates: Object.assign({}, state.loadingStates, {
          getQuestions: {
            isLoading: true,
            isSuccess: false,
            action: QuizActions.Types.GET_QUESTIONS
          }
        })
      })
    }

    case QuizActions.Types.GET_QUESTIONS_SUCCESS: {
      Object.assign({}, state, {
        questions: action.payload.questions,
        loadingStates: Object.assign({}, state.loadingStates, {
          getQuestions: {
            isLoading: false,
            isSuccess: true,
            action: QuizActions.Types.GET_QUESTIONS
          }
        })
      
      })
      console.log('i getQuestion success')
      console.log(action.payload.questions);

      return Object.assign({}, state, {
        questions: action.payload.questions,
        loadingStates: Object.assign({}, state.loadingStates, {
          getQuestions: {
            isLoading: false,
            isSuccess: true,
            action: QuizActions.Types.GET_QUESTIONS
          }
        })
      })
    }

    case QuizActions.Types.QUIZ_ERROR: {
      return Object.assign({}, state, {
        error: action.payload
      })
    }

    default: {
      return state;
    }

    // Remove errors when navigating between Auth pages
    case routerActions.ActionTypes.GO: {
      return Object.assign({}, state, {
        loadingStates: quizInitialState.loadingStates,
        error: quizInitialState.error,
      });
    }

    case routerActions.ActionTypes.BACK: {
      return Object.assign({}, state, {
        loadingStates: quizInitialState.loadingStates,
        error: quizInitialState.error,
      });
    }

    case routerActions.ActionTypes.FORWARD: {
      return Object.assign({}, state, {
        loadingStates: quizInitialState.loadingStates,
        error: quizInitialState.error,
      });
    }

  }
}
