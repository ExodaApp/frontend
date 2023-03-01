/** @type {import('tailwindcss').Config} */

const MOBILE = 'mobile'
const TABLET = 'tablet'
const LAPTOP = 'laptop'

const screens = {
    [MOBILE]: 352,
    [TABLET]: 620,
    [LAPTOP]: 900,
}

const screensWithPx = {}

for (const key in screens)
    screensWithPx[key] = screens[key] + 'px'

module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        colors: {
            transparent: 'transparent',
            primary: 'rgba(92, 26, 233, 0.5)',
            'primary-solid': 'rgba(92, 26, 233, 1)',
            'primary-light': 'rgba(108,48,235, 1)',
            white: '#CBCBCB',
            'off-white': 'rgba(255, 255, 255, 0.60)',
            'dark-solid': 'rgba(0, 0, 0, 1)',
            'dark-0': 'rgba(0, 0, 0, 0.8)',
            'dark-1': 'rgba(0, 0, 0, 0.4)',
            'dark-2': 'rgba(17, 17, 17, 0.75)',
            'dark-3': 'rgba(21, 21, 21, 0.90)',
            'dark-4': 'rgba(33, 33, 33, 0.5)',
            red: '#cc2936',
            yellow: '#fabc2a',
            green: '#59cd90',
        },

        spacing: {
            0: '0',
            1: '1px',
            2: '2px',
            4: '4px',
            6: '6px',
            8: '8px',
            10: '10px',
            12: '12px',
            16: '16px',
            20: '20px',
            24: '24px',
            32: '32px',
            40: '40px',
            48: '48px',
            56: '56px',
            64: '64px',
            72: '72px',
            80: '80px',
            88: '88px',
            96: '96px',
            120: '120px',
            200: '200px',
            240: '240px',
            280: '280px',
            320: '320px',
            400: '400px',
            480: '480px',
            560: '560px',
        },

        maxWidth: {
            default: 1440,
            app: 998 + (48 * 2),
            modal: 430 + (48 * 2),
            // search: 430,
            // login: 390 + (48 * 2),
            // screen: '100vw',
        },

        screens: screensWithPx,

        minWidth: {
            '1/4': '20%'
        },

        maxHeight: {
            'landing-images': 600,
        },

        fontSize: {
            10: '10px',
            12: '12px',
            14: '14px',
            16: '16px',
            18: '18px',
            20: '20px',
            24: '24px',
            32: '32px',
            40: '40px',
            48: '48px',
            56: '56px',
        },

        fontWeight: {
            100: 100,
            300: 300,
            400: 400,
            500: 500,
            600: 600,
            700: 700,
        },

        fontFamily: {
            lexend: ['Lexend Deca'],
            syne: ['Syne'],
            jakarta: ['Plus Jakarta Sans']
        },

        lineHeight: {
            1: '1',
            1.2: '1.2',
            1.5: '1.5',
            1.8: '1.8',
        },

        letterSpacing: {
            2: '2px',
            4: '4px',
        },
    },
    plugins: [],
}
