import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddSpendMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  date: Scalars['String']['input'];
  platform: Scalars['String']['input'];
}>;


export type AddSpendMutation = { addSpend?: { id: string, amount: number, date: string, platform: string } };


export const AddSpendDocument = gql`
    mutation AddSpend($amount: Float!, $date: String!, $platform: String!) {
  addSpend(amount: $amount, date: $date, platform: $platform) {
    id
    amount
    date
    platform
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AddSpend(variables: AddSpendMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddSpendMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddSpendMutation>(AddSpendDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddSpend', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;