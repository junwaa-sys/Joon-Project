export interface Category {
  id: number
  name: string
  description: string
  userId: string
}

export type NewCategory = Omit<Category, 'id'>

export type UpdateCategory = Partial<Category>
