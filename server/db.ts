import { JSONFilePreset } from 'lowdb/node';

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

interface Data {
  customers: Customer[];
  nextId: number;
}

const defaultData: Data = {
  customers: [],
  nextId: 1
};

// Seed data
const seeds: Partial<Customer>[] = [
  { full_name: 'BS. Nguyễn Thị Hoa', phone: '0901234567', email: 'hoa.nguyen@bachmai.vn', company: 'BV Bạch Mai', position: 'Bác sĩ Tim mạch', status: 'converted', tags: 'Doctor,VIP', notes: 'Đã mua 2 máy Holter 24h', source: 'Event - Holter Launch' },
  { full_name: 'ThS. Trần Văn Minh', phone: '0912345678', email: 'minh.tran@vinmec.com', company: 'Vinmec Times City', position: 'Trưởng khoa Nội tim mạch', status: 'interested', tags: 'Doctor', notes: 'Quan tâm đến Holter 7 ngày', source: 'Event - Holter Launch' },
  { full_name: 'DS. Lê Thị Mai', phone: '0923456789', email: 'mai.le@medlatec.vn', company: 'Medlatec', position: 'Dược sĩ', status: 'contacted', tags: 'Pharmacist', notes: 'Liên hệ lại tuần sau', source: 'Event - Holter Launch' },
  { full_name: 'BS. Phạm Quốc Hùng', phone: '0934567890', company: 'BV 108', position: 'Bác sĩ Nội khoa', status: 'new_lead', tags: 'Doctor', source: 'Event - Holter Launch' },
  { full_name: 'CN. Vũ Thị Lan', phone: '0945678901', email: 'lan.vu@hospital.vn', company: 'BV Đa khoa Hà Đông', position: 'Điều dưỡng trưởng', status: 'new_lead', tags: 'Nurse', source: 'Event - Holter Launch' },
  { full_name: 'PGS. Hoàng Văn Nam', phone: '0956789012', email: 'nam.hoang@hmu.edu.vn', company: 'ĐH Y Hà Nội', position: 'Giảng viên Tim mạch', status: 'interested', tags: 'Professor,VIP', notes: 'Muốn dùng thử cho nghiên cứu', source: 'Event - Holter Launch' },
  { full_name: 'BS. Ngô Thị Thanh', phone: '0967890123', company: 'PK Đa khoa Medcare', position: 'Bác sĩ', status: 'converted', tags: 'Doctor', notes: 'Đã ký hợp đồng', source: 'Event - Holter Launch' },
  { full_name: 'KTV. Đinh Văn Long', phone: '0978901234', email: 'long.dinh@lab.vn', company: 'BV Tim Hà Nội', position: 'Kỹ thuật viên', status: 'contacted', tags: 'Technician', source: 'Event - Holter Launch' },
  { full_name: 'BS. Bùi Thị Hương', phone: '0989012345', email: 'huong.bui@vinmec.com', company: 'Vinmec Royal City', position: 'Bác sĩ Nhi tim mạch', status: 'new_lead', tags: 'Doctor', source: 'Event - Holter Launch' },
  { full_name: 'QL. Đặng Văn Toàn', phone: '0990123456', email: 'toan.dang@admin.vn', company: 'Sở Y tế Hà Nội', position: 'Chuyên viên quản lý', status: 'lost', tags: 'Admin', notes: 'Không có ngân sách năm nay', source: 'Event - Holter Launch' },
];

export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData);
  
  // Seed if empty
  if (db.data.customers.length === 0) {
    const now = new Date().toISOString();
    db.data.customers = seeds.map((s, index) => ({
      ...s,
      id: index + 1,
      full_name: s.full_name || '',
      phone: s.phone || '',
      email: s.email || '',
      company: s.company || '',
      position: s.position || '',
      status: s.status as any || 'new_lead',
      tags: s.tags || '',
      notes: s.notes || '',
      source: s.source || 'Event - Holter Launch',
      created_at: now,
      updated_at: now
    } as Customer));
    db.data.nextId = seeds.length + 1;
    await db.write();
  }
  
  return db;
};
