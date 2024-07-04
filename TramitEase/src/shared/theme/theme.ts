import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
    colors: {
      primary: {
        default: '#686D76',
        hower: "#484B50",
        action: "#868C96",
      },
      secondary: {
        default: '#373A40',
        hower: "#030303",
        action: "#282C30",
      },
      ternary: {
        default: '#DC5F00',
        hower: "#CA5000",
        action: "#EB6500",
      },
      error: {
          default: '#DC2626',
          hower: "#C92525",
          action: "#FF4949",
      },
      warning: {
          default: '#FFD03D',
          hower: "#FACB3A",
          action: "#F6D15C",
      },
      success: {
          default: '#07B848',
          hower: "#14B04E",
          action: "#08C74F",
      },
      background: {
          default: '#EEEEEE',
          hower: "#E9E9E9",
          action: "#F5F5F5",
      },
      info_link: {
          default: '#2AACE7',
          hower: "#26A3DC",
          action: "#47BEF4",
      },
      shades: {
          black: '#121214',
          white: "#F2F2F2",
      },
    },
    fonts: {
        headers: {
            header1: {
                bold:{
                    fontFamily: 'Roboto',
                    fontSize: '36px',
                    fontWeight:500,
                    lineHeight:1.2,
                    color: '#121214',
                },
                normal:{
                    fontFamily: 'Roboto',
                    fontSize: '36px',
                    fontWeight: 'normal',
                    lineHeight: 1.5,
                    color: '#121214',
                },
            },
            header2: {
                bold:{
                    fontFamily: 'Roboto',
                    fontSize: '32px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#121214',
                },
                normal:{
                    fontFamily: 'Roboto',
                    fontSize: '32px',
                    fontWeight: 'normal',
                    lineHeight: 1.5,
                    color: '#121214',
                },

            },
            header3: {
                bold:{
                    fontFamily: 'Roboto',
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: '#121214',
                },
                normal:{
                    fontFamily: 'Roboto',
                    fontSize: '24px',
                    fontWeight: 'normal',
                    lineHeight: 1.5,
                    color: '#121214',
                },
            },
        },
        paragraph: {
            bodyRegular: {
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: 300,
                lineHeight: 1.5,
                color: '#121214',
            },
            paragraphRegular: {
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 'normal',
                lineHeight: 1.5,
                color: '#121214',
            },
            captionRegular: {
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: 'normal',
                lineHeight: 1.5,
                color: '#121214',
            },
            labelRegular: {
                fontFamily: 'Roboto',
                fontSize: '12px',
                fontWeight: 'normal',
                lineHeight: 1.5,
                color: '#121214',
            },
            labelThin: {
                fontFamily: 'Roboto',
                fontSize: '11px',
                fontWeight: 'normal',
                lineHeight: 1.5,
                color: '#121214',
            },
        },
    },
};

export default theme;
