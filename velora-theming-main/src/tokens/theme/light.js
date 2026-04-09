/**
 * Light theme tokens from Figma
 * Generated from Figma token exports
 * 
 * Primary colors use {Primary.XXX} references that resolve to each brand's color scale.
 * Neutral and other semantic colors remain hardcoded as they're consistent across brands.
 */

export default {
  "Neutral": {
    "Overlay": "#20134B",
    "Text": {
      "Default": "#20134B",
      "Weak": "#6F6B77",
      "Weak Hover": "#20134B",
      "Disabled": "#6F6B77",
      "Foreground": "#FFFFFF"
    },
    "Bg": {
      "Default": "#FFFFFF",
      "Weak": "#FAFAFA",
      "Medium": "#F8F7FA",
      "Hover": "#F1EFF4",
      "Active": "#F1EFF4",
      "Strong": "#DFDDE4",
      "Disabled": "#F1EFF4"
    },
    "Border": {
      "Default": "#EAE8EF",
      "Hover": "#E5E3EA",
      "Active": "#DFDDE4",
      "Strong": "#C6C3CB",
      "Strong Hover": "#8E8A96",
      "Disabled": "#8E8A96",
      "Weak": "#FFFFFF"
    }
  },
  "Primary": {
    "Text": {
      "Default": "{Primary.800}",
      "Hover": "{Primary.900}",
      "Strong": "#FFFFFF"
    },
    "Bg": {
      "Default": "{Primary.100}",
      "Hover": "{Primary.200}",
      "Active": "{Primary.300}",
      "Strong": "{Primary.800}",
      "Strong Hover": "{Primary.900}"
    },
    "Border": {
      "Default": "{Primary.300}",
      "Hover": "{Primary.500}",
      "Active": "{Primary.700}",
      "Strong": "{Primary.500}",
      "Strong Hover": "{Primary.800}"
    }
  },
  "Accent 1": {
    "Text": {
      "Default": "{Accent1.950}",
      "Strong": "{Accent1.999}"
    },
    "Bg": {
      "Default": "{Accent1.200}",
      "Medium": "{Accent1.500}",
      "Strong": "{Accent1.700}"
    },
    "Border": {
      "Default": "{Accent1.300}",
      "Strong": "{Accent1.700}",
      "Strong Hover": "{Accent1.950}"
    },
    "Icon": {
      "Default": "{Accent1.800}",
      "Icon Hover": "{Accent1.900}"
    }
  },
  "Danger": {
    "Text": {
      "Default": "#BA272C",
      "Hover": "#A12226",
      "Strong": "#FFFFFF"
    },
    "Bg": {
      "Default": "#FFEFEF",
      "Default Hover": "#F9C6C6",
      "Weak": "#FFFCFC",
      "Weak Hover": "#FFEFEF",
      "Weak Active": "#FFE5E5",
      "Strong": "#DB3030",
      "Strong Hover": "#BA272C",
      "Strong Active": "#A12226"
    },
    "Border": {
      "Default": "#FDD8D8",
      "Strong": "#EB9091",
      "Strong Hover": "#DB3030",
      "Strong Active": "#BA272C"
    }
  },
  "Success": {
    "Text": {
      "Default": "#29660F",
      "Hover": "#263209",
      "Strong": "#263209"
    },
    "Bg": {
      "Default": "#DFF7C7",
      "Hover": "#D1F2B0",
      "Active": "#BEE894",
      "Strong": "#BEE894"
    },
    "Border": {
      "Default": "#D1F2B0",
      "Strong": "#8ED52A"
    },
    "Icon": {
      "Strong": "#8ED52A"
    }
  },
  "Warning": {
    "Text": {
      "Default": "#80440D",
      "Hover": "#4D2A0A",
      "Strong": "#421B07"
    },
    "Bg": {
      "Default": "#FFF4D5",
      "Hover": "#FFECBC",
      "Active": "#FFE3A2",
      "Strong": "#FFE3A2",
      "Strong Hover": "#FFD386",
      "Strong Active": "#F3BA63"
    },
    "Border": {
      "Default": "#FFE3A2",
      "Hover": "#FFD386",
      "Active": "#F3BA63",
      "Weak": "#FFF4D5",
      "Strong": "#F3BA63"
    }
  },
  "Accent 2": {
    "Text": {
      "Default": "#0F5A61",
      "Strong": "#093034",
      "Weak": "#6AD2DB"
    },
    "Bg": {
      "Default": "#BBF4FB",
      "Weak": "#E8FBFC",
      "Strong": "#70D8E1"
    },
    "Border": {
      "Default": "#70D8E1",
      "Weak": "#BBF4FB",
      "Strong": "#40B9C4"
    }
  },
  "Nav": {
    "Bg Default": "{Primary.300}",
    "Bg Hover": "{Primary.400}",
    "Bg Strong": "{Primary.800}",
    "Global Icon Strong": "#FAFAFA",
    "Bg Strong Hover": "{Primary.950}"
  },
  "Btn": {
    "Bg": {
      "Primary": "{Primary.800}",
      "Secondary": "{Primary.100}",
      "Primary Hover": "{Primary.900}",
      "Secondary Hover": "{Primary.200}",
      "Disabled": "#F1EFF4",
      "Danger": "#FFFCFC",
      "Danger Hover": "#FFEFEF",
      "Secondary Mono Hover": "#F1EFF4",
      "Plain Hover": "#E5E3EA"
    },
    "Text": {
      "Primary": "#FFFFFF",
      "Secondary": "#20134B",
      "Disabled": "#6F6B77",
      "Danger": "#BA272C",
      "Danger Hover": "#A12226"
    },
    "Border": {
      "Secondary": "{Primary.700}",
      "Secondary Mono": "#20134B",
      "Danger": "#EB9091",
      "Danger Hover": "#DB3030"
    },
    "Icon": {
      "Secondary": "{Primary.700}"
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
      "Default": "#FFFFFF"
    }
  },
  "Illustration": {
    "Outline": "{Primary.800}",
    "Cyan": {
      "Outline": "#E8FBFC",
      "Light": "#BBF4FB",
      "Mid": "#6AD2DB",
      "Strong": "#00646D",
      "Strongest": "#093034"
    },
    "Green": {
      "Outline": "#DFF7C7",
      "Light": "#BEE894",
      "Mid": "#9DD16A",
      "Strong": "#29660F"
    },
    "Red": {
      "Outline": "#FFEFEF",
      "Light": "#FDD8D8",
      "Mid": "#DB3030"
    },
    "Amber": {
      "Outline": "#FFF4D5",
      "Light": "#FFF4D5",
      "Mid": "#FFD386",
      "Strong": "#EE9D2B"
    },
    "Purple": {
      "Outline": "{Primary.300}",
      "Light": "{Primary.500}",
      "Mid": "{Primary.600}",
      "Strong": "{Primary.800}"
    },
    "Pink": {
      "Outline": "#FFEBFD",
      "Light": "#FFACF4",
      "Mid": "#FF66E4"
    },
    "Neutral": {
      "Light": "#FFFFFF"
    }
  },
  "Skeleton": {
    "10": "#000000",
    "05": "#000000",
    "07": "#000000"
  },
  "FocusRing": {
    "Primary": "{Primary.400}",
    "Danger": "#F9C6C6",
    "Interactive": "#FFD9FB"
  },
  "Chart": {
    "10": "#79E5EF",
    "01": "{Primary.950}",
    "02": "{Primary.800}",
    "03": "{Primary.700}",
    "04": "{Primary.500}",
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
