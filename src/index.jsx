/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import "./index.css";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

import App from "./App";
import Home from "./routes/Home/home";
import Quiz from "./routes/Quiz/quiz";
import Coach from "./routes/Coach/coach";

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/coach" component={Coach} />
    </Router>
  ),
  root
);
