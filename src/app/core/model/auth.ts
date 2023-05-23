export interface AuthResponse {
    id: string
    email: string
    name: string
    token: string
}

export interface UserData {
    id: string
    role: string
    name: string
    email: string
    iat: number
    exp: number
}
  