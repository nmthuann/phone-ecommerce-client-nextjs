export type AuthResponse = {
    success: boolean;
    message: string
}

export type AuthErrorResponse ={
    success: boolean;
    error: string
}

export type RegisterResponse = {
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    address: string;
    accessToken: string;
    refreshToken: string;
} 

export type LoginResponse = {
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    address: string;
    accessToken: string;
    refreshToken: string;
} 