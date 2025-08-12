import type { Config } from "tailwindcss";


export default {
    content: [
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/styles/*.{js,jsx,ts,tsx}",
        "./src/app/**/*.{js,jsx,ts,tsx}",
        "./src/pages/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            //Em teoria isso faz com que fique padrão a Segoe UI para todos os sistemas
            fontFamily: {
                'sans': ['"Segoe UI"', 'Roboto', 'system-ui', 'sans-serif'],
            }
        },
    },
} satisfies Config;