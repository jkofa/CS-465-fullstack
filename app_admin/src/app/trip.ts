export interface Trip {
  _id?: string;
  code: string;          // ✅ add this
  name: string;
  length: string;
  resort: string;
  perPerson: number;
  image: string;
  description: string;
}