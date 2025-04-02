import { Attribute } from '@/types/products.type'

export const convertJsonToAttributes = (skuAttributes: Record<string, string>): Attribute[] => {
  return Object.entries(skuAttributes).map(([key, value]) => ({
    key,
    value
  }))
}

export function convertAttributesToJson(attributes: Attribute[]): Record<string, string> {
  return attributes.reduce((obj, item) => {
    obj[item.key] = item.value
    return obj
  }, {} as Record<string, string>)
}
