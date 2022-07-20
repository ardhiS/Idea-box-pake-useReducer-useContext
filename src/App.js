import React, { useState, useEffect, useReducer } from "react";
import Ideas from "./Ideas";
import Form from "./Form";
import ThemeContext from "./ThemeContext";
import "./App.css";

const initialState = {
  ideas: [],
  theme: "light",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      const newTheme = state.theme === "light" ? "dark" : "light";
      return { ...state, theme: newTheme };
    case "ADD_IDEA":
      return { ...state, ideas: [...state.ideas, action.idea] };
    case "REMOVE_IDEA":
      const filteredIdeas = state.ideas.filter((idea) => idea.id !== action.id);
      return { ...state, idea: filteredIdeas };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.title = `IdeaBox (${state.ideas.length})`;
  });

  const addIdea = (newIdea) => {
    const action = { type: "ADD_IDEA", idea: newIdea };
    dispatch(action);
  };
  const deleteIdea = (id) => {
    const action = { type: "REMOVE_IDEA", id };
    dispatch(action);
  };

  const toggleTheme = () => {
    const action = { type: "TOGGLE_THEME" };
    dispatch(action);
  };

  return (
    <ThemeContext.Provider value={state.theme}>
      <main className="App">
        <h1>IdeaBox</h1>
        <button onClick={toggleTheme}>Change</button>
        <Form addIdea={addIdea} />
        <Ideas ideas={state.ideas} deleteIdea={deleteIdea} />
      </main>
    </ThemeContext.Provider>
  );
}

export default App;
