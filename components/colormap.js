import chroma from "chroma-js";

export const colormap = {
  temp: {
    "-60":"#0000C3",
    "-59":"#0000C3",
    "-58":"#0000C3",
    "-57":"#0000C3",
    "-56":"#0000C3",
    "-55":"#0000C3",
    "-54":"#0000C3",
    "-53":"#0000C3",
    "-52":"#0000C3",
    "-51":"#0000C3",
    "-50":"#0000C3",
    "-49":"#0000C3",
    "-48":"#0000C3",
    "-47":"#0000C3",
    "-46":"#0000C3",
    "-45":"#0000C3",
    "-44":"#0000C3",
    "-43":"#0000C3",
    "-42":"#0000C3",
    "-41":"#0000C3",
    "-40":"#0000C3",
    "-39":"#0000C3",
    "-38":"#0000C3",
    "-37":"#0000C3",
    "-36":"#0000C3",
    "-35":"#0000C3",
    "-34":"#0000C3",
    "-33":"#0000C3",
    "-32":"#0000C3",
    "-31":"#0000C3",
    "-30":"#0000C3",
    "-29":"#0000C3",
    "-28":"#0000C3",
    "-27":"#0000C3",
    "-26":"#0000C3",
    "-25":"#0000C3",
    "-24":"#0000C3",
    "-23":"#0000C3",
    "-22":"#0000C3",
    "-21":"#0000C3",
    "-20":"#0000C3",
    "-19":"#0000C3",
    "-18":"#0000C3",
    "-17":"#0000C3",
    "-16":"#0000C3",
    "-15":"#0000FF",
    "-14":"#0000FF",
    "-13":"#0000FF",
    "-12":"#0000FF",
    "-11":"#0000FF",
    "-10": "#03cffc",
    "-9": "#03cffc",
    "-8": "#03cffc",
    "-7": "#03cffc",
    "-6": "#03cffc",
    "-5": "#03cffc",
    "-4": "#03cffc",
    "-3": "#03cffc",
    "-2": "#03cffc",
    "-1": "#03cffc",
    "0": "#03cffc",
    "1": "#03cffc",
    "2": "#03cffc",
    "3": "#03cffc",
    "4": "#03cffc",
    "5": "#03cffc",
    "6": "#03cffc",
    "7": "#03cffc",
    "8": "#03cffc",
    "9": "#03cffc",
    "10": "#03cffc",
    "11": "#00D6B5",
    "12": "#00D6B5",
    "13": "#00D6B5",
    "14": "#00D6B5",
    "15": "#00D6B5",
    "16": "#00FE81",
    "17": "#00FE81",
    "18": "#00FE81",
    "19": "#00FE81",
    "20": "#00FE81",
    "21": "#00FE81",
    "22": "#00FE81",
    "23": "#00FE81",
    "24": "#1DBB00",
    "25":"#1DBB00",
    "26":"#1DBB00",
    "27":"#1DBB00",
    "28":"#1DBB00",
    "29":"#EAFF00",
    "30":"#EAFF00",
    "31":"#FFC600",
    "32":"#FFC600",
    "33":"#FFC600",
    "34":"#FF8A00",
    "35":"#FF8A00",
    "36":"#FF8A00",
    "37":"#FF3C00",
    "38":"#FF3C00",
    "39":"#FF3C00",
    "40":"#FF0000",
    "41":"#FF0000",
    "42":"#FF0000",
    "43":"#FF0000",
    "44":"#FF0000",
    "45":"#FF0000",
    "46":"#FF0000",
    "47":"#FF0000",
    "48":"#FF0000",
    "49":"#FF0000",
    "50":"#FF0000",
    "51":"#FF0000",
    "52":"#FF0000",
    "53":"#FF0000",
    "54":"#FF0000",
    "55":"#FF0000",
    "56":"#FF0000",
    "57":"#FF0000",
    "58":"#FF0000",
    "59":"#FF0000",
    "60":"#FF0000",
  },
  condition: {
    "Clear": "#fcc603",
    "ClearNight": "#FFE036",
    "Night": "#002481",
    "Clouds": "#b0bdbf",
    "Rain": "#03d3fc",
    "Thunderstorm": "#EAFF00",
    "Drizzle": "#03d3fc",
    "Snow": "#FFFFFF",
    "Mist":"#B4B4B4",
    "Smoke":"#B4B4B4",
    "Haze":"#B4B4B4",
    "Dust":"#4C4905",
    "Fog":"#8A8A8A",
    "Sand":"#D3AF06",
    "Dust":"#D3AF06",
    "Ash":"#593B36",
    "Squall":"#0A008F",
    "Tornado":"#54317F",
  },
  wind: {
    0:"#80857d",
    1:"#80857d",
    2:"#80857d",
    3:"#80857d",
    4:"#80857d",
    5:"#80857d",
    6:"#3ee369",
    7:"#3ee369",
    8:"#3ee369",
    9:"#3ee369",
    10:"#3ee369",
    11:"#3ee369",
    12:"#35d48f",
    13:"#35d48f",
    14:"#35d48f",
    15:"#35d48f",
    16:"#35d48f",
    17:"#35d48f",
    18:"#35d48f",
    19:"#35d48f",
    20:"#35d4ce",
    21:"#35d4ce",
    22:"#35d4ce",
    23:"#35d4ce",
    24:"#35d4ce",
    25:"#35d4ce",
    26:"#35d4ce",
    27:"#35d4ce",
    28:"#35d4ce",
    29:"#2356aa",
    30:"#2356aa",
    31:"#2356aa",
    32:"#2356aa",
    33:"#2356aa",
    34:"#2356aa",
    35:"#2356aa",
    36:"#2356aa",
    37:"#2356aa",
    38:"#2356aa",
    39:"#2c39b6",
    40:"#2c39b6",
    41:"#2c39b6",
    42:"#2c39b6",
    43:"#2c39b6",
    44:"#2c39b6",
    45:"#2c39b6",
    46:"#2c39b6",
    47:"#2c39b6",
    48:"#2c39b6",
    49:"#2c39b6",
    50:"#182389",
    51:"#C34711",
    52:"#C34711",
    53:"#C34711",
    54:"#C34711",
    55:"#C34711",
    56:"#C34711",
    57:"#C34711",
    58:"#C34711",
    59:"#C34711",
    60:"#C34711",
    61:"#C34711",
    62:"#C34711",
    63:"#C34711",
    64:"#C34711",
    65:"#C34711",
    66:"#C34711",
    67:"#C34711",
    68:"#C34711",
    69:"#C34711",
    70:"#C34711",
    71:"#C34711",
    72:"#C34711",
    73:"#C34711",
    74:"#C34711",
    75:"#C34711",
    76:"#C34711",
    77:"#C34711",
    78:"#C34711",
    79:"#C34711",
    80:"#C34711",
    81:"#C34711",
    82:"#C34711",
    83:"#C34711",
    84:"#C34711",
    85:"#C34711",
    86:"#C34711",
    87:"#C34711",
    88:"#C34711",
    89:"#d62121",
    90:"#d62121",
    91:"#d62121",
    92:"#d62121",
    93:"#d62121",
    94:"#d62121",
    95:"#d62121",
    96:"#d62121",
    97:"#d62121",
    98:"#d62121",
    99:"#d62121",
    100:"#d62121",
  },
  humidity: {
    0:"#a4a8ab",
    1:"#a4a8ab",
    2:"#a4a8ab",
    3:"#a4a8ab",
    4:"#a4a8ab",
    5:"#a4a8ab",
    6:"#888a8c",
    7:"#888a8c",
    8:"#888a8c",
    9:"#888a8c",
    10:"#888a8c",
    11:"#83682e",
    12:"#83682e",
    13:"#83682e",
    14:"#83682e",
    15:"#83682e",
    16:"#83682e",
    17:"#83682e",
    18:"#83682e",
    19:"#83682e",
    20:"#83682e",
    21:"#aab133",
    22:"#aab133",
    23:"#aab133",
    24:"#aab133",
    25:"#aab133",
    26:"#aab133",
    27:"#aab133",
    28:"#aab133",
    29:"#aab133",
    30:"#aab133",
    31:"#9ED535",
    32:"#9ED535",
    33:"#9ED535",
    34:"#9ED535",
    35:"#9ED535",
    36:"#9ED535",
    37:"#9ED535",
    38:"#9ED535",
    39:"#9ED535",
    40:"#9ED535",
    41:"#9ED535",
    42:"#9ED535",
    43:"#9ED535",
    44:"#9ED535",
    45:"#9ED535",
    46:"#93DC59",
    47:"#93DC59",
    48:"#93DC59",
    49:"#79CE68",
    50:"#79CE68",
    51:"#79CE68",
    52:"#79CE68",
    53:"#79CE68",
    54:"#79CE68",
    55:"#79CE68",
    56:"#79CE68",
    57:"#79CE68",
    58:"#79CE68",
    59:"#79CE68",
    60:"#33b139",
    61:"#33b139",
    62:"#33b139",
    63:"#33b139",
    64:"#33b139",
    65:"#33b139",
    66:"#33b139",
    67:"#33b139",
    68:"#33b139",
    69:"#33b139",
    70:"#33b139",
    71:"#33b139",
    72:"#077824",
    73:"#077824",
    74:"#077824",
    75:"#077824",
    76:"#077824",
    77:"#077824",
    78:"#077824",
    79:"#077824",
    80:"#077824",
    81:"#077824",
    82:"#077824",
    83:"#077824",
    84:"#077824",
    85:"#077824",
    86:"#077824",
    87:"#077824",
    88:"#077824",
    89:"#077824",
    90:"#077824",
    91:"#077824",
    92:"#077824",
    93:"#077824",
    94:"#077824",
    95:"#077824",
    96:"#077824",
    97:"#077824",
    98:"#077824",
    99:"#077824",
    100:"#077824",
  },
  air: {
    0:"#009966",
    1:"#e8ff69",  // rgba(232, 255, 105, 0.7)
    2:"#ff9933",
    3:"#cc0033",
    4:"#660099",
    5:"#7E0023",
  },
}


function truncate_temp(n){
  if (-60 <= n && n <= 60){return n}
  else if (n < -60){return -60}
  else if (n > 60){return 60}
}

function truncate_wind(n){
  if (0 <= n && n <= 100){return n}
  else if (n > 100){return 100}
}

function getairindex(n){
  if (n <= 50){return 0}
  else if (50 < n && n <= 100){return 1}
  else if (100 < n && n <= 150){return 2}
  else if (150 < n && n <= 200){return 3}
  else if (200 < n && n <= 300){return 4}
  else if (n > 300){return 5}
}

export function getcolor(type, value){
  if (type == 'temp'){value = truncate_temp(value)}
  else if (type == 'wind'){value = truncate_wind(value)}
  else if (type == 'air'){value = getairindex(value)}

  return colormap[type][value]
}