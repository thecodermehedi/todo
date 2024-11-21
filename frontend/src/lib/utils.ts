import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v7 as uuid } from "uuid"

export const cn = (...inputs: ClassValue[]) => {
 return twMerge(clsx(inputs))
}


export const generateId = () => {
 return uuid()
}
