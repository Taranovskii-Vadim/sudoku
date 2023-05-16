export const getAtomKey = (prefix: string, tail?: string): string => `${prefix}Atom${tail ? `/${tail}` : ''}`;

export const getSelectorKey = (prefix: string, tail?: string): string => `${prefix}Selector${tail ? `/${tail}` : ''}`;
