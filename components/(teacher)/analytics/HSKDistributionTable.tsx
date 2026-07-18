interface HSKDistributionTableProps {
  data: any[];
}

export default function HSKDistributionTable({
  data,
}: HSKDistributionTableProps) {
  return (
    <div className="rounded-xl border p-5">
      <h2 className="mb-4 text-xl font-semibold">
        HSK Vocabulary Distribution
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">
              HSK Level
            </th>

            <th className="py-2 text-left">
              Total Vocabulary
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.hskLevel}
              className="border-b"
            >
              <td className="py-3">
                HSK {item.hskLevel}
              </td>

              <td className="py-3">
                {item._count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}