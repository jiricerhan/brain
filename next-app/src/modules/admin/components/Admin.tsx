import React from "react";

type Props = {
  form: React.ReactNode;
};

const Admin = ({ form }: Props) => {
  return (
    <>
      <h1>Admin</h1>
      {form}
    </>
  );
};

export default React.memo(Admin);
