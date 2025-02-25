export type User = {
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    address: string;
}

export type UserRegister = {
    email: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    address: string;
}

export type UserRegisterResponse = {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    email: string;
    phone: string;
    address: string;
    birthday?: string; 
    accessToken: string
}

export type Profile = {
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    gender: string;
    birthday: Date;
    address: string;
    phone: string;
}