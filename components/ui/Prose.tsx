// Minimal body renderer for admin-authored content. No Markdown dependency is
// installed, so we render plain text: blank lines become paragraphs and single
// newlines become line breaks. Text is escaped by React (no dangerouslySetInnerHTML).
export function Prose({ text }: { text: string }) {
  const paragraphs = text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="prose-content space-y-5 t-lead text-muted">
      {paragraphs.map((para, i) => (
        <p key={i}>
          {para.split("\n").map((line, j) => (
            <span key={j}>
              {line}
              {j < para.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
