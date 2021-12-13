/**
 * 
 */

export function addFlag(value: number, flag: number): number {
  return value | flag;
}

export function removeFlag(value: number, flag: number) {
  return (value &= ~flag);
}

export function toggleFlag(value: number, flag: number): number {
  if (hasFlag(value, flag)) {
    return removeFlag(value, flag);
  } else {
    return addFlag(value, flag);
  }
}

export function hasFlag(value: number, flag: number): boolean {
  return (value & flag) === flag;
}
