export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  profile?: IProfile; // Association vers Profile
  reservations?: IReservation[]; // Association vers plusieurs Reservations
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProfile {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  user?: IUser; 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReservation {
  id: number;
  description: string;
  startDate: Date;
  endDate: Date;
  nights: number;
  person: number;
  price: number;
  userId?: number;
  hotelId?: number;
  passId?: number;
  animationId?: number;
  user?: IUser; // Association vers User
  hotel?: IHotel; // Association vers Hotel
  pass?: IPass; // Association vers Pass
  animation?: IAnimation; // Association vers Animation
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IHotel {
  id: number;
  name: string;
  description: string;
  address: string;
  postalCode: string;
  city: string;
  priceByNight: number;
  reservations?: IReservation[]; // Association vers plusieurs Reservations
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAnimation {
  id: number;
  name: string;
  description: string;
  type: string;
  reservations?: IReservation[]; // Association vers plusieurs Reservations
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPass {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPlan {
  id?: number;
  name: string;
  description?: string;
  position?: {
    top: string;
    left: string;
    zone?: string;
  };
  img?: string;
}

