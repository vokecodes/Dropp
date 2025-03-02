import React, { Fragment } from "react";
import { FaEllipsisH } from "react-icons/fa";

const Table = ({ columns, data }:any) => {
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
            <Fragment key={rowIndex}>
              <tr className="border-b">
                {Object.values(row).map((value: any, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="py-4 px-6 text-black font-medium"
                  >
                    {typeof value === "object" ? (
                      <span>
                        <span className="text-black font-semibold block">
                          {value?.name}
                        </span>
                        <span className="text-[#7F7F7F] text-sm">
                          {value?.type}
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
              {/* Description Row - as a separate row */}
              {row.showDescription && (
                <tr>
                  <td
                    colSpan={Object.values(row).length + 1}
                    className="py-0 px-0"
                  >
                    <div className="block bg-[#F9F9F9] rounded-xl p-4 mb-4">
                      <p className="text-md text-[#6D6D6D] font_medium">
                        Description
                      </p>
                      <p className="text-md text-black font_medium">
                        {row.description}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
