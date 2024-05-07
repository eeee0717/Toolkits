export interface NamedRegExp {
  value: string
  label: string
}
export const isNumber = {
  value: '^[0-9]*$',
  label: '匹配数字',
}

export const isChinese = {
  value: '[\\u4E00-\\u9FA5]',
  label: '匹配中文',

}

export const isEmail = {
  value: '[\\w!#$%&\'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&\'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?',
  label: '匹配邮箱',

}

export const regPresetsList = [
  isNumber,
  isChinese,
  isEmail,
]
