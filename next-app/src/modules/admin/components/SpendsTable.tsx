import { Spend } from "@modules/db/model";
import React from "react";
import styles from "./SpendsTable.module.css";

type Props = {
  spends: Spend[];
};
const SpendsTable = ({ spends }: Props) => {
  return (
    <table className={styles['spends-table']}>
      <thead>
        <tr>
          <th>platform</th>
          <th>amount</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {spends.map((spend) => {
          return (
            <tr key={spend.id}>
              <td>{spend.platform}</td>
              <td>{spend.amount}</td>
              <td>{spend.date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default React.memo(SpendsTable);
