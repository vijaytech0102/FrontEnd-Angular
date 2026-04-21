export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  marks: number;
  status: 'passed' | 'failed';
}
