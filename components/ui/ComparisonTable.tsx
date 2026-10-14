// Semantic comparison table (SOP B.9). LLMs lift tables — so this must always
// be a real <table>, never an image.
export function ComparisonTable({
  caption,
  headers,
  rows,
}: {
  caption?: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-8 overflow-hidden rounded-[20px] border border-line bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          {caption ? (
            <caption className="border-b border-line px-5 py-4 text-left t-small text-muted sm:px-6">{caption}</caption>
          ) : null}
          <thead>
            <tr className="bg-mist">
              {headers.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`px-5 py-4 font-normal sm:px-6 ${i === 0 ? "t-small uppercase text-muted" : "t-body text-ink"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-line">
                {row.map((cell, j) => (
                  <td key={j} className={`px-5 py-4 align-top sm:px-6 ${j === 0 ? "t-body text-ink" : "t-body text-muted"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
