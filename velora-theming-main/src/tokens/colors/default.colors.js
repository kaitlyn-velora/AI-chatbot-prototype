/** @typedef {import('../types').ColorTokens} ColorTokens */

const primary = {
  50: "#edf5fa",
  100: "#e4f2fa", 
  200: "#d6e7f3",
  300: "#c9ddeb",
  400: "#9fc4dc",
  500: "#84adc7",
  600: "#5792b6",
  700: "#006c9b",
  800: "#005d8c",
  900: "#1073a2",
  950: "#021019"
};

const success = {
  50: "#F6FCF0",
  100: "#EBFADC",
  200: "#DFF7C7",
  300: "#D1F2B0",
  400: "#BEE894",
  500: "#9DD16A",
  600: "#73BA2C",
  700: "#8ED52A",
  800: "#80C225",
  900: "#29660F",
  950: "#263209"
};

const warning = {
  50: "#FFF9ED",
  100: "#FFF4D5",
  200: "#FFECBC",
  300: "#FFE3A2",
  400: "#FFD386",
  500: "#F3BA63",
  600: "#EE9D2B",
  700: "#FFB224",
  800: "#80440D",
  900: "#4D2A0A",
  950: "#421B07",
};

const danger = {
  50: "#FFF8F8",
  100: "#FFEFEF",
  200: "#FFE5E5",
  300: "#FDD8D8",
  400: "#F9C6C6",
  500: "#F3AEAF",
  600: "#EB9091",
  700: "#DB3030",
  800: "#BA272C",
  900: "#A12226",
  950: "#381316"
};

const neutral = {
  50: "#F8F7FA",
  100: "#F1EFF4",
  200: "#EAE8EF",
  300: "#E5E3EA",
  400: "#DFDDE4",
  500: "#D9D6DD",
  600: "#C6C3CB",
  700: "#8E8A96",
  800: "#74717A",
  900: "#6F6B77",
  950: "#1A1523"
};

/** @type {ColorTokens} */
export const colors = {
   primary,
   success,
   warning,
   danger,
   neutral,
   text: {
     neutral: {
        default: primary[950],
        weak: neutral[700],
        weakHover: neutral[600],
        disabled: neutral[500],
        foreground: neutral[900],
    },
    primary: {
      default: primary[700],
      hover: primary[800],
      strong: primary[900],
    },
    success: {
      default: success[900]
    },
    danger: {
      default: danger[800]
    }
   },
   borderTokens: {
       danger: {
         default: danger[300],
         strong: danger[600],
         strongHover: danger[700],
         strongActive: danger[800],
       },
       neutral: {
         default: neutral[100],
         strong: neutral[600],
         strongHover: neutral[700],
         strongActive: neutral[800],
       },
       primary: {
         default: primary[300],
         strong: primary[600],
         strongHover: primary[700],
         strongActive: primary[800],
       }
   },
   bgTokens: {
     neutral: {
       default: "#ffffff",
       active: neutral[100],
       hover: neutral[50],
     },
     primary: {
       default: primary[50],
       active: primary[100],
       strong: primary[700],
     },
     success: {
       default: success[200],
     }
   },
   focusRing: {
     primary: primary[200],
     danger: danger[200],
     success: success[200],
   }
}