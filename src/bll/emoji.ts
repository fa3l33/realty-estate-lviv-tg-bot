
export const CHECKED: string = "✅";

export function toggleChecked(value: string) {
  let checkedIndex = value.indexOf(CHECKED);

  if (checkedIndex !== -1) {
    return value.replace(CHECKED, "");
  }

  return CHECKED + value;
}
