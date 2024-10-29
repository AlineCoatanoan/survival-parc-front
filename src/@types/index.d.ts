export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    token: string;
  }
  
  export interface IProfile {
    id: number;
    gender: string;
    city: string;
    postalCode: string;
    address: string;
    birthDate: string;
    userId: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface IAnimation {
    id: number;
    name: string;
    description: string;
    type: string;
    photo: string;
    createdAt?: string;
    updatedAt?: string;
    reservations?: IReservation[];
  }
  
  export interface IHotel {
    id: number;
    name: string;
    description: string;
    photo: string;
    categoryId: string;
    stars: number;
    price: number;
    roomCount: number;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface IPass { 
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface IReservation {
    id: number;                
    description: string;       
    startDate: Date;          
    endDate: Date;            
    nights: number;           
    person: number;           
    price: number;            
    profileId: number;        
    hotelId: number;          
    passId: number;           
    createdAt?: string;       
    updatedAt?: string;       
}

  

  

  
