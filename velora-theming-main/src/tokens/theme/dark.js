/**
 * Dark theme tokens from Figma
 * Generated from Figma token exports
 * 
 * Primary colors use {PrimaryDark.XXX} references that resolve to each brand's dark color scale.
 * Neutral and other semantic colors remain hardcoded as they're consistent across brands.
 */

export default {
  "Neutral": {
    "Overlay": "#20134B",
    "Text": {
      "Default": "#FFFFFF",
      "Weak": "#FFFFFF",
      "Weak Hover": "#FFFFFF",
      "Disabled": "#FFFFFF",
      "Foreground": "#FFFFFF"
    },
    "Bg": {
      "Default": "#000000",
      "Weak": "#111418",
      "Medium": "#191A1A",
      "Hover": "#252626",
      "Active": "#252626",
      "Strong": "#2E3033",
      "Disabled": "#252626"
    },
    "Border": {
      "Default": "#2E3033",
      "Hover": "#36343A",
      "Active": "#403E44",
      "Strong": "#514D57",
      "Strong Hover": "#716D78",
      "Disabled": "#716D78",
      "Weak": "#7E7A86"
    }
  },
  "Primary": {
    "Text": {
      "Default": "{PrimaryDark.950}",
      "Hover": "{PrimaryDark.800}",
      "Strong": "#000000"
    },
    "Bg": {
      "Default": "{PrimaryDark.100}",
      "Hover": "{PrimaryDark.300}",
      "Active": "{PrimaryDark.400}",
      "Strong": "{PrimaryDark.900}",
      "Strong Hover": "{PrimaryDark.800}"
    },
    "Border": {
      "Default": "{PrimaryDark.300}",
      "Hover": "{PrimaryDark.500}",
      "Active": "{PrimaryDark.700}",
      "Strong": "{PrimaryDark.500}",
      "Strong Hover": "{PrimaryDark.800}"
    }
  },
  "Accent 1": {
    "Text": {
      "Default": "{Accent1Dark.950}",
      "Strong": "{Accent1Dark.999}"
    },
    "Bg": {
      "Default": "{Accent1Dark.200}",
      "Medium": "{Accent1Dark.500}",
      "Strong": "{Accent1Dark.700}"
    },
    "Border": {
      "Default": "{Accent1Dark.400}",
      "Strong": "{Accent1Dark.700}",
      "Strong Hover": "{Accent1Dark.950}"
    },
    "Icon": {
      "Default": "{Accent1Dark.800}",
      "Icon Hover": "{Accent1Dark.900}"
    }
  },
  "Danger": {
    "Text": {
      "Default": "#F2555A",
      "Hover": "#FF8084",
      "Strong": "#000000"
    },
    "Bg": {
      "Default": "#3C181A",
      "Default Hover": "#671E22",
      "Weak": "#1F1315",
      "Weak Hover": "#3C181A",
      "Weak Active": "#481A1D",
      "Strong": "#DB3030",
      "Strong Hover": "#F2555A",
      "Strong Active": "#FF8084"
    },
    "Border": {
      "Default": "#541B1F",
      "Strong": "#AA2429",
      "Strong Hover": "#DB3030",
      "Strong Active": "#F2555A"
    }
  },
  "Success": {
    "Text": {
      "Default": "#87CC27",
      "Hover": "#ECFBDD",
      "Strong": "#1F2E0F"
    },
    "Bg": {
      "Default": "#1A260D",
      "Hover": "#1F2E0F",
      "Active": "#243711",
      "Strong": "#8ED52A"
    },
    "Border": {
      "Default": "#243711",
      "Strong": "#2E6716"
    },
    "Icon": {
      "Strong": "#8ED52A"
    }
  },
  "Warning": {
    "Text": {
      "Default": "#FFCB47",
      "Hover": "#F1A10D",
      "Strong": "#4A2900"
    },
    "Bg": {
      "Default": "#341C00",
      "Hover": "#3F2200",
      "Active": "#4A2900",
      "Strong": "#FFB224",
      "Strong Hover": "#F1A10D",
      "Strong Active": "#F1A10D"
    },
    "Border": {
      "Default": "#4A2900",
      "Hover": "#573300",
      "Active": "#693F05",
      "Weak": "#341C00",
      "Strong": "#824E00"
    }
  },
  "Accent 2": {
    "Text": {
      "Default": "#70D8E1",
      "Strong": "#03353A",
      "Weak": "#70D8E1"
    },
    "Bg": {
      "Default": "#03353A",
      "Weak": "#052629",
      "Strong": "#70D8E1"
    },
    "Border": {
      "Default": "#004F56",
      "Weak": "#03353A",
      "Strong": "#00646D"
    }
  },
  "Nav": {
    "Bg Default": "{PrimaryDark.150}",
    "Bg Hover": "{PrimaryDark.400}",
    "Bg Strong": "{PrimaryDark.500}",
    "Global Icon Strong": "{PrimaryDark.999}",
    "Bg Strong Hover": "{PrimaryDark.700}"
  },
  "Btn": {
    "Bg": {
      "Primary": "{Primary.800}",
      "Secondary": "{PrimaryDark.150}",
      "Primary Hover": "{PrimaryDark.900}",
      "Secondary Hover": "{PrimaryDark.400}",
      "Disabled": "#ABA8B2",
      "Danger": "#1F1315",
      "Danger Hover": "#3C181A",
      "Secondary Mono Hover": "#252626",
      "Plain Hover": "#36343A"
    },
    "Text": {
      "Primary": "#FFFFFF",
      "Secondary": "#F5F4F6",
      "Disabled": "#403E44",
      "Danger": "#FF8084",
      "Danger Hover": "#DB3030"
    },
    "Border": {
      "Secondary": "{PrimaryDark.700}",
      "Secondary Mono": "#716D78",
      "Danger": "#F2555A",
      "Danger Hover": "#DB3030"
    },
    "Icon": {
      "Secondary": "{PrimaryDark.800}"
    },
    "BorderRadius": {
      "Default": 1600
    }
  },
  "Tooltip": {
    "Bg": {
      "Default": "#20134B"
    },
    "Border": {
      "Default": "{PrimaryDark.500}"
    }
  },
  "Illustration": {
    "Outline": "{Primary.900}",
    "Cyan": {
      "Outline": "#03353A",
      "Light": "#6AD2DB",
      "Mid": "#40B9C4",
      "Strong": "#00646D",
      "Strongest": "#093034"
    },
    "Green": {
      "Outline": "#263209",
      "Light": "#9DD16A",
      "Mid": "#73BA2C",
      "Strong": "#80C225"
    },
    "Red": {
      "Outline": "#381316",
      "Light": "#F3AEAF",
      "Mid": "#DB3030"
    },
    "Amber": {
      "Outline": "#421B07",
      "Light": "#FFE3A2",
      "Mid": "#F3BA63",
      "Strong": "#EE9D2B"
    },
    "Purple": {
      "Outline": "{PrimaryDark.50}",
      "Light": "{PrimaryDark.950}",
      "Mid": "{PrimaryDark.500}",
      "Strong": "{Primary.800}"
    },
    "Pink": {
      "Outline": "#3B0A32",
      "Light": "#FFACF4",
      "Mid": "#FA60DE"
    },
    "Neutral": {
      "Light": "#FFFFFF"
    }
  },
  "Skeleton": {
    "10": "#FFFFFF",
    "05": "#FFFFFF",
    "07": "#FFFFFF"
  },
  "FocusRing": {
    "Primary": "{PrimaryDark.400}",
    "Danger": "#671E22",
    "Interactive": "#501B46"
  },
  "Chart": {
    "10": "#79E5EF",
    "01": "{Primary.900}",
    "02": "{PrimaryDark.900}",
    "03": "{PrimaryDark.950}",
    "04": "{Primary.200}",
    "05": "#EA594E",
    "06": "#F9A813",
    "07": "#FFD25F",
    "08": "#019DAB",
    "09": "#2DC8D6",
    "Comparison": "#888888",
    "Cartesian Grid": "#EFEDF2",
    "Axis": "#D6D4D9"
  }
};
