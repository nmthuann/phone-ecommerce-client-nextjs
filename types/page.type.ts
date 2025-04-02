export type Page<T> = {
  data: T[]
  meta: PageMeta
}

export type PageMeta = {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
