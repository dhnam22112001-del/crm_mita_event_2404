import { Customer, Stats } from '../types';

export async function fetchCustomers(search?: string, status?: string): Promise<Customer[]> {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (status) params.append('status', status);
  
  const res = await fetch(`/api/customers?${params.toString()}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch customers');
  }
  return res.json();
}

export async function createCustomer(data: Partial<Customer>): Promise<Customer> {
  const res = await fetch('/api/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create customer');
  }
  const result = await res.json();
  return result.customer;
}

export async function updateCustomer(id: number, data: Partial<Customer>): Promise<Customer> {
  const res = await fetch(`/api/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to update customer');
  }
  const result = await res.json();
  return result.customer;
}

export async function deleteCustomer(id: number): Promise<void> {
  const res = await fetch(`/api/customers/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to delete customer');
  }
}

export async function fetchStats(): Promise<Stats> {
  const res = await fetch('/api/stats');
  if (!res.ok) {
    throw new Error('Failed to fetch stats');
  }
  return res.json();
}
