import {ADD_RESUME, EDIT_RESUME} from "../actions/resumeAction";
const initialState = {
  resumesData: [],
  editingResume:{}
};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESUME:
  const resume = action.payload;
  const data = state.resumesData;
  const index = data.findIndex(item => item.id === resume.id);

  if (index === -1) {
    return { ...state, resumesData: [...data, resume] };
  } else {
    const newData = [...data];
    newData[index] = resume;
    return { ...state, resumesData: newData };
  }

    case EDIT_RESUME:
      return {...state,editingResume:action.payload}
    default:
      return state;
  }
};

export default resumeReducer;
