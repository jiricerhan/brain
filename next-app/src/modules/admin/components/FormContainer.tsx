import createClientSdk from "@modules/graphql/graphqlClient/createClientSdk";
import Form from "./Form";
import SpendsTable from "./SpendsTable";
import { useState } from "react";
import { Spend } from "@modules/db/model";

type Props = {
  spends: Spend[];
};

const FormContainer = ({ spends: initialSpends }: Props) => {
  const [spends, setspends] = useState<typeof initialSpends>(initialSpends);
  const [platform, setPlatform] = useState<string>("facebook");
  const [amount, setAmount] = useState<string>("100");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onPlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatform(e.target.value);
  };
  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const clientSdk = createClientSdk("/api/graphql");
      const addSpendResponse = await clientSdk.AddSpend({
        amount: Number(amount),
        date: date,
        platform: platform,
      });
      if (addSpendResponse.addSpend) {
        setspends([addSpendResponse.addSpend, ...spends]);
      }
    } catch (error) {
      console.error(error);
      setError("Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const platformOptions = ["facebook", "google"];

  const spendsTable = <SpendsTable spends={spends} />;

  return (
    <Form
      spendsTable={spendsTable}
      onSubmit={onSubmit}
      platformOptions={platformOptions}
      platform={platform}
      onPlatformChange={onPlatformChange}
      amount={amount}
      onAmountChange={onAmountChange}
      date={date}
      onDateChange={onDateChange}
      loading={loading}
      error={error}
    />
  );
};

export default FormContainer;
