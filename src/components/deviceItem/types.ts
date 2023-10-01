export interface IDevice {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  img: string;
  createdAt: string;
  updatedAt: string;
  typeId: number | string;
  brandId: number | string;
  type: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  brand: {
    id: number;
    name: string;
    createdAt: string;
    updated: string;
  };
  ratings: any[];
}
