export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  profile?: IProfile; 
  reservations?: IReservation[]; 
  hotelId?: number;   
  passId?: number;     
  hotelName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProfile {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  user?: IUser; 
  hotel?: IHotel;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReservation {
  id: number;
  description: string;
  startDate: Date;
  endDate: Date;
  nights: number;
  isHotelIncluded: boolean;
  person: number;
  price: number;
  userId?: number;
  hotelId?: number;
  passId?: number;
  animationId?: number;
  user?: IUser; 
  hotel?: IHotel; 
  hotelName?: string;
  pass?: IPass; 
  animation?: IAnimation; 
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface pour l'hôtel
interface IHotel {
  id: number;
  name: string;
  description: string;
  address: string;
  postalCode: string;
  city: string;
  priceByNight: string;
  createdAt: string;
  updatedAt: string;
}

// Interface pour la réservation d'hôtel
export interface IHotelReservation {
  id: number;
  hotel: {
    id: number;
    description: string;
    name: string;
    priceByNight: number;
  };
  profileId: number;
  hotelId: number;
  startDate: string;
  endDate: string;
  status: string;
  priceByNight: number;
  totalPrice: number;
  numberOfPeople: number;
  createdAt: string;
  updatedAt: string;
  hotel: IHotel; 
}

export interface IAnimation {
  id: number;
  name: string;
  description: string;
  type: string;
  reservations?: IReservation[]; 
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

