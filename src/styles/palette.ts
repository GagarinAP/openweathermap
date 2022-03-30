import colors from "./colors";

export type PaletteType =  {
    text: {
        primary: string;
        secondary: string;
    };
    background: {
        system: string;
        primary: string;
        secondary: string;
    };
}

export const light: PaletteType = {
    text: {
        primary: colors.black,
        secondary: colors.white,
    },
    background: {
        system: colors.grey,
        primary: colors.white,
        secondary: colors.black,
    },
};

export const dark: PaletteType = {
    text: {
        primary: colors.white,
        secondary: colors.black,
    },
    background: {
        system: colors.darkGrey,
        primary: colors.black,
        secondary: colors.white,
    },
};
