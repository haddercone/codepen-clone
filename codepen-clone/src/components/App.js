import Editor from "./Editor";
import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setsrcDoc] = useState("");
  
  const placeHolder = `
      <html>
      <body style="height:90vh;display:flex; justify-content:center; align-items:center;color:#2e2e2e">
        <h1> Your code output here...</h1>
      </body>
      </html>
      `
  useEffect(() => {
    const timeout = setTimeout(() => {
      setsrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={(html === "" && css === "" && js === "") ? placeHolder : srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </>
  );
}

export default App;
