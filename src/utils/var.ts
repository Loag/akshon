export function to_var(value: string) {
  return "$" + "${" + value + "}"
}