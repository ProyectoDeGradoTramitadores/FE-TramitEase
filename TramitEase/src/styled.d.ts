import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: {
                default: string;
                hower: string;
                action: string;
            };
            secondary: {
                default: string;
                hower: string;
                action: string;
            };
            ternary: {
                default: string;
                hower: string;
                action: string;
            };
            background: {
                default: string;
                hower: string;
                action: string;
            };
            error: {
                default: string;
                hower: string;
                action: string;
            };
            warning: {
                default: string;
                hower: string;
                action: string;
            };
            success: {
                default: string;
                hower: string;
                action: string;
            };
            info_link: {
                default: string;
                hower: string;
                action: string;
            };
            shades: {
                black: string;
                white: string;
            };
        };
        fonts: {
            headers: {
                header1: {
                    bold:{
                        fontFamily: string;
                        fontSize: string;
                        fontWeight:number;
                        lineHeight:number;
                        color: string;
                    };
                    normal: {
                        fontFamily: string;
                        fontSize: string;
                        fontWeight:number | string;
                        lineHeight:number;
                        color: string;
                    }
                };
                header2: {
                    bold:{
                        fontFamily: string;
                        fontSize: string;
                        fontWeight:number;
                        lineHeight:number;
                        color: string;
                    };
                    normal: {
                        fontFamily: string;
                        fontSize: string;
                        fontWeight:number | string;
                        lineHeight:number;
                        color: string;
                    }
                };
                header3: {
                    bold:{
                        fontFamily: string;
                        fontSize: string;
                        fontWeight:number;
                        lineHeight:number;
                        color: string;
                    };
                    normal: {
                        fontFamily: string;
                        fontSize: string;
                        fontWeight:number | string;
                        lineHeight:number;
                        color: string;
                    }
                };
            };
            paragraph: {
                bodyRegular: {
                    fontFamily: string;
                    fontSize: string;
                    fontWeight:number | string;
                    lineHeight:number;
                    color: string;
                },
                paragraphRegular: {
                    fontFamily: string;
                    fontSize: string;
                    fontWeight:number | string;
                    lineHeight:number;
                    color: string;
                },
                captionRegular: {
                    fontFamily: string;
                    fontSize: string;
                    fontWeight:number | string;
                    lineHeight:number;
                    color: string;
                },
                labelRegular: {
                    fontFamily: string;
                    fontSize: string;
                    fontWeight:number | string;
                    lineHeight:number;
                    color: string;
                },
                labelThin: {
                    fontFamily: string;
                    fontSize: string;
                    fontWeight:number | string;
                    lineHeight:number;
                    color: string;
                },
            };
        };
    }
}
