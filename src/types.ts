export interface Customer {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  company: string;
  position: string;
  status: 'new_lead' | 'contacted' | 'interested' | 'converted' | 'lost';
  tags: string;
  notes: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface Stats {
  total: number;
  new_lead: number;
  contacted: number;
  interested: number;
  converted: number;
  lost: number;
  thisWeek: number;
}
