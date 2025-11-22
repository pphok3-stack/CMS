export interface Contact {
  id?: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  group: string;
  notes?: string;
  favorite?: boolean;
}

export type ContactGroup = 'Family' | 'Friends' | 'Work' | '';
