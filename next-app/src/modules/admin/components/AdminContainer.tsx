import { Spend } from "@modules/db/model";
import Admin from "./Admin";
import FormContainer from "./FormContainer";
import LayoutContainer from "@components/LayoutContainer";

export type Props = {
  spends: Spend[];
};

const AdminContainer = ({ spends }: Props) => {
  const form = <FormContainer spends={spends} />;
  return (
    <LayoutContainer title="Admin">
      <Admin form={form} />
    </LayoutContainer>
  );
};

export default AdminContainer;
