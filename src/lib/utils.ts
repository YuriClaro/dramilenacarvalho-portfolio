type ClassValue = string | false | null | undefined;

/** Junta nomes de classe ignorando valores vazios (versão mínima do cn do shadcn). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
