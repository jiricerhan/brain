import React from "react";
import styles from './Form.module.css'

type Props = {
  spendsTable: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  platform: string;
  platformOptions: string[];
  onPlatformChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  amount: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  date: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: string;
};

const Form = ({
  spendsTable,
  onSubmit,
  platformOptions,
  platform,
  onPlatformChange,
  amount,
  onAmountChange,
  date,
  onDateChange,
  loading,
  error,
}: Props) => {
  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <select
          required
          name="platform"
          value={platform}
          onChange={onPlatformChange}
        >
          {platformOptions.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
        <input
          required
          type="number"
          name="amount"
          value={amount}
          onChange={onAmountChange}
        />
        <input
          type="date"
          max={new Date().toISOString().slice(0, 10)}
          required
          name="date"
          value={date}
          onChange={onDateChange}
        />
        <button disabled={loading} type="submit">
          add
        </button>
      </form>
      {error && <p className={styles.form__error}>{error}</p>}
      {spendsTable}
    </>
  );
};

export default React.memo(Form);
