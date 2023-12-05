import * as Font from 'expo-font';

export const customFonts = {
    DMSansBold: require('./assets/fonts/DMSans-Bold.ttf'),
    DMSansRegular: require('./assets/fonts/DMSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Archivo-ExtraBoldItalic': require('./assets/fonts/Archivo-ExtraBoldItalic.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Archivo-BlackItalic': require('./assets/fonts/Archivo-BlackItalic.ttf'),
    'Archivo-Bold': require('./assets/fonts/Archivo-Bold.ttf'),
    // Your font definitions here...
};

export async function loadCustomFonts() {
    try {
        await Font.loadAsync(customFonts);
        //console.log('Custom fonts loaded successfully');
    } catch (error) {
        //console.error('Error loading custom fonts: ', error);
    }
}

/* font sizes */
export const FontSize = {
    size_11xl: 30,
    medium12_size: 12,
    medium14_size: 14,
    semibold16_size: 16,
    size_21xl: 40,
    bold22_size: 22,
    size_mini: 15,
    medium13_size: 13,
    size_4xs: 9,
    size_3xs: 10,
    displayXsMedium_size: 24,
    size_base_5: 16,
    size_xl: 20,
};
/* Colors */
export const Color = {
    colorWhitesmoke: "#f9f9f9",
    colorMidnightblue_100: "#130160",
    colorMidnightblue_300: "#150b3d",
    colorMidnightblue_200: "#0d0140",
    colorDimgray: "#524b6b",
    colorDarkorange: "#ff9228",
    pureWhite: "#fff",
    colorWhite: "#fff",
    colorDarkgray_100: "#aaa6b9",
    colorDarkgray_300: "#979799",
    colorDarkgray_200: "#95969d",
    colorLavender: "#e6e1ff",
    colorBlack: "#000",
    greenPure: "#0e9d57",
    colorGray_100: "#fafafa",
    colorGray: "#222",
    gray900: "#101828",
    black: "#0d0d26",
    bG: "#fafafd",
    colorRed: "#ff0000",
    colorRoyalblue: "#2e6bf1",
    colorTomato: "#de4619",
    colorSteelblue: "#356899",
    colorGainsboro: "#e6e6e6",
};
/* Paddings */
export const Padding = {
    p_xl: 20,
    p_5xs: 8,
    p_6xl: 25,
    p_5xl: 24,
    p_29xl: 48,
    p_base: 16,
    p_xs: 12,
    p_11xs: 2,
    p_9xs: 4,
};
/* border radiuses */
export const Border = {
    br_7xs: 6,
    br_8xs: 5,
    br_3xs: 10,
    br_78xl: 97,
    br_xl: 20,
    br_21xl_4: 40,
    br_mini: 15,
    br_lg: 18,
    br_5xl: 24,
    br_mid_9: 18,
    br_sm_8: 14,
};

