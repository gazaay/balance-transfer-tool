import { configureStore } from '@reduxjs/toolkit';
import loanReducer from '../features/loanSlice';

export default configureStore({
  reducer: {
    loan: loanReducer,
  },
});
