interface NamedRegExp {
  pattern: RegExp
  name: string
}

export const isNumber: NamedRegExp = {
  pattern: /^[0-9]*$/g,
  name: '匹配数字',
}
