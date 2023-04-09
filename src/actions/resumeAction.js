export const ADD_RESUME = "ADD_RESUME";

export const addResume = (data) => ({ type: ADD_RESUME, payload: data });

export const EDIT_RESUME = "EDIT_RESUME";

export const editResume = (resume) => ({ type: EDIT_RESUME, payload: resume});
