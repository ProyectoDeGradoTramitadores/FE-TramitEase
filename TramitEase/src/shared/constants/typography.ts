import theme from "../theme/theme.ts";

export const sizeToFontLogo = {
    xl: 80,
    l: 60,
    m: 50,
    s: 40,
    xs: 30,
};

export const fontStyles: Record<string, ( textStyle?: string) => any> = {
    xl: (textStyle?: string) =>
        textStyle === 'bold' ? theme.fonts.headers.header1.bold : theme.fonts.headers.header1.normal,
    l: (textStyle?: string) =>
        textStyle === 'bold' ? theme.fonts.headers.header2.bold : theme.fonts.headers.header2.normal,
    m: ( textStyle?: string) =>
        textStyle === 'bold' ? theme.fonts.headers.header3.bold : theme.fonts.headers.header3.normal,
    s: () => theme.fonts.paragraph.paragraphRegular,
    xs: () => theme.fonts.paragraph.labelRegular,
};
