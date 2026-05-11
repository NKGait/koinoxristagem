export interface Building {
  id: string;
  name: string;
  address: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Apartment {
  id: string;
  buildingId: string;
  number: string;
  ownerName: string;
  tenantName: string;
  sharesCommon: number; // χιλιοστά κοινοχρήστων
  sharesHeating: number; // χιλιοστά θέρμανσης
  sharesElevator: number; // χιλιοστά ανελκυστήρα
  sharesSpecial: number; // ειδικά χιλιοστά
  email?: string;
}

export type ExpenseCategory = 'common' | 'heating' | 'elevator' | 'special' | 'other';

export interface Expense {
  id: string;
  buildingId: string;
  month: number;
  year: number;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
}

export interface Calculation {
  id: string;
  buildingId: string;
  month: number;
  year: number;
  results: Record<string, {
    common: number;
    heating: number;
    elevator: number;
    special: number;
    total: number;
  }>;
  totals: {
    common: number;
    heating: number;
    elevator: number;
    special: number;
    total: number;
  };
  createdAt: string;
}
