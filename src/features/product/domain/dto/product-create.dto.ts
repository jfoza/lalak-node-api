export interface IProductCreateDto {
  description: string;
  details?: string;
  value: number;
  quantity: number;
  categories: string[];
  events: string[];
}
