import { FaEllipsisH } from "react-icons/fa";

const Table = ({ columns, data }) => {
  return (
    <div className="mt-6 bg-white rounded-xl shadow-md">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-6 text-[#7F7F7F] font-medium">
                {col}
              </th>
            ))}
            <th className="py-3 px-6 text-[#7F7F7F] font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {Object.values(row).map((value, cellIndex) => (
                <td
                  key={cellIndex}
                  className="py-4 px-6 text-black font-medium"
                >
                  {typeof value === "object" ? (
                    <span>
                      <span className="text-black font-semibold block">
                        {value.name}
                      </span>
                      <span className="text-[#7F7F7F] text-sm">
                        {value.type}
                      </span>
                    </span>
                  ) : (
                    value
                  )}
                </td>
              ))}
              {/* Actions Column */}
              <td className="py-4 px-6 text-[#7F7F7F] text-xl">
                <FaEllipsisH />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
