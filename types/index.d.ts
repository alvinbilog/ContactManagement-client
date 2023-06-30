export type ContactInterface = {
  _id: string;
  name: string;
  address?: string;
  email: string;
  number?: string;
};
export type EditContactInterface = {
  _id: string;
  name?: string;
  address?: string;
  email?: string;
  number?: string;
};

export type ServerResponse<T> = {
  success: boolean;
  data: T;
  error: String;
};
