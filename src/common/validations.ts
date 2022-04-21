export function stringEscape(str: string) {
  return str.replace(/[\-\[\]\/{}()*+?.\\^$|]/g, '\\$&')
}

export function extractEmail(user: any): string {
  return user.email;
}
