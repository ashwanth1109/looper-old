import { combineReducers } from 'redux';
import {
  SET_END_TIME,
  SET_START_TIME,
  SELECT_PART,
  UNSELECT_PART
} from '../types/actions';

import loops from '../data/loops';

const playerVars = (
  state = { start: null, end: null, selected: [] },
  { type, payload }
) => {
  switch (type) {
    case SET_START_TIME:
      return { start: payload, end: state.end };
    case SET_END_TIME:
      return { start: state.start, end: payload };
    case SELECT_PART: {
      const { selected } = payload;
      if (selected !== undefined) {
        const newSelected = [...state.selected, selected].sort((a, b) => a - b);
        const newStart = loops[newSelected[0]].start;
        const newEnd = loops[newSelected[newSelected.length - 1]].end;
        return {
          start: newStart,
          end: newEnd,
          selected: newSelected
        };
      }
      return state;
    }
    case UNSELECT_PART: {
      const { selected } = payload;
      if (selected !== undefined) {
        const newSelected = state.selected.filter(el => el !== selected);
        const newStart = loops[newSelected[0]].start;
        const newEnd = loops[newSelected[newSelected.length - 1]].end;
        return {
          start: newStart,
          end: newEnd,
          selected: newSelected
        };
      }
      return state;
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({ playerVars });

export default rootReducer;
