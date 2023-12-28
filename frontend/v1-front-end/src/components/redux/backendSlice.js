// actions.js
export const setBackendUrl = (url) => ({
  type: "SET_BACKEND_URL",
  payload: url,
});

// reducer.js
const initialState = {
  backendUrl: "",
};
console.log("backendSLice");
const backendUrlReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BACKEND_URL":
      return { ...state, backendUrl: action.payload };
    default:
      return state;
  }
};

export default backendUrlReducer;
