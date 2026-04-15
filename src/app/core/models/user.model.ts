export type PhoneType = 'Fixo' | 'Celular';

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  phoneType: PhoneType;
}
