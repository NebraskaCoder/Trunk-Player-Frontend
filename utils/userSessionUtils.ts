export const getUserInitials = (name: string | null | undefined) => {
  if (!name) {
    return undefined;
  }

  const names = name.split(" ");

  return (
    names[0].charAt(0).toUpperCase() +
    names[names.length - 1].charAt(0).toUpperCase()
  );
};
