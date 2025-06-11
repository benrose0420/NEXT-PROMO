import { products } from "../../../db/schema"
import { eq } from "drizzle-orm"
import db from "../../../db/drizzle"

export async function getProductBySlug(slug: string) {
  return await db.query.products.findFirst({
    where: eq(products.slug, slug),
  })
}