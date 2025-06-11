import { products } from '../db/schema'
import { InferSelectModel } from 'drizzle-orm'
import z from 'zod'
import { cartItemSchema } from '../validator'
import { carts } from '../db/schema'

// PRODUCTS
export type Product = InferSelectModel<typeof products>

export type CartItem = z.infer<typeof cartItemSchema>

// CART
export type Cart = InferSelectModel<typeof carts>