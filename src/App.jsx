import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [teacherName, setTeacherName] = useState("Profe");
  const [message, setMessage] = useState(
    "Gracias por su dedicación y por inspirarnos cada día."
  );
  const [stylePreset, setStylePreset] = useState("vscode");
  const previewRef = useRef(null);
  const MESSAGE_MAX = 240;
  const remaining = MESSAGE_MAX - message.length;
  const hintClassName = useMemo(() => {
    if (remaining <= 0) return "gp-hint max";
    if (remaining <= 40) return "gp-hint warn";
    return "gp-hint";
  }, [remaining]);

  const snippetText = useMemo(() => {
    const lines = [
      `// Gracias, ${teacherName}!`,
      "const mensaje = `",
      ...message.split("\n").map((line) => "  " + line),
      "`;",
      "console.log(mensaje)",
    ];
    return lines.join("\n");
  }, [teacherName, message]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(snippetText);
    } catch {
      // fallback para navegadores sin clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = snippetText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  const downloadAsImage = async () => {
    if (!previewRef.current) return;
    const node = previewRef.current;
    const canvas = await html2canvas(node, {
      backgroundColor: null,
      scale: window.devicePixelRatio || 2,
    });
    const link = document.createElement("a");
    link.download = `gracias-${teacherName
      .replace(/\s+/g, "-")
      .toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="gp-container">
      <header className="gp-header">
        <h1>Gracias Profe</h1>
        <p>Escribe tu mensaje y genera un snippet con estilo de IDE.</p>
      </header>

      <section className="gp-grid">
        <form className="gp-form" onSubmit={(e) => e.preventDefault()}>
          <div className="gp-field">
            <label htmlFor="teacher">Nombre del profe</label>
            <input
              id="teacher"
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Ej. María López"
            />
          </div>

          <div className="gp-field">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu agradecimiento..."
              maxLength={MESSAGE_MAX}
            />
            <div className={hintClassName} aria-live="polite">
              {message.length} / {MESSAGE_MAX} caracteres
            </div>
          </div>

          <div className="gp-field">
            <label htmlFor="preset">Estilo</label>
            <select
              id="preset"
              value={stylePreset}
              onChange={(e) => setStylePreset(e.target.value)}
            >
              <option value="vscode">VS Code</option>
              <option value="terminal">Terminal</option>
            </select>
          </div>

          <div className="gp-actions">
            <button type="button" className="btn" onClick={copyToClipboard}>
              Copiar código
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={downloadAsImage}
            >
              Descargar imagen
            </button>
          </div>
        </form>

        <div className="gp-preview-wrapper">
          <div
            ref={previewRef}
            className={`code-shell ${
              stylePreset === "terminal" ? "terminal" : "vscode"
            }`}
          >
            {stylePreset === "vscode" ? (
              <div className="winbar">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span className="title">
                  gracias_{teacherName.replace(/\s+/g, "_").toLowerCase()}.js
                </span>
              </div>
            ) : (
              <div className="prompt">pablo@pc:~$ node gracias.js</div>
            )}
            <pre className="code-block">
              <code>{snippetText}</code>
            </pre>
          </div>
        </div>
      </section>

      <footer className="gp-footer">
        <span>Hecho con ❤️ para los mentores y tutores</span>
      </footer>
    </div>
  );
}

export default App;
