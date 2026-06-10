var songs = [
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        searchTerm: "blinding lights the weeknd"
    },
    {
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        searchTerm: "watermelon sugar harry styles"
    },
    {
        title: "Mood",
        artist: "24kGoldn ft. iann dior",
        searchTerm: "mood 24kgoldn iann dior"
    },
    {
        title: "Dynamite",
        artist: "BTS",
        searchTerm: "dynamite bts"
    },
    {
        title: "Therefore I Am",
        artist: "Billie Eilish",
        searchTerm: "therefore i am billie eilish"
    },
    {
        title: "Positions",
        artist: "Ariana Grande",
        searchTerm: "positions ariana grande"
    },
    {
        title: "Laugh Now Cry Later",
        artist: "Drake ft. Lil Durk",
        searchTerm: "laugh now cry later drake"
    },
    {
        title: "Rockstar",
        artist: "DaBaby ft. Roddy Ricch",
        searchTerm: "rockstar dababy roddy ricch"
    },
    {
        title: "Go Crazy",
        artist: "Chris Brown & Young Thug",
        searchTerm: "go crazy chris brown young thug"
    },
    {
        title: "Holy",
        artist: "Justin Bieber ft. Chance the Rapper",
        searchTerm: "holy justin bieber chance the rapper"
    },
    {
        title: "Levitating",
        artist: "Dua Lipa",
        searchTerm: "levitating dua lipa"
    },
    {
        title: "Good 4 U",
        artist: "Olivia Rodrigo",
        searchTerm: "good 4 u olivia rodrigo"
    },
    {
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        searchTerm: "stay the kid laroi justin bieber"
    },
    {
        title: "Montero (Call Me By Your Name)",
        artist: "Lil Nas X",
        searchTerm: "montero call me by your name lil nas x"
    },
    {
        title: "Peaches",
        artist: "Justin Bieber ft. Daniel Caesar & Giveon",
        searchTerm: "peaches justin bieber"
    },
    {
        title: "Leave The Door Open",
        artist: "Bruno Mars & Anderson .Paak",
        searchTerm: "leave the door open silk sonic"
    },
    {
        title: "Heat Waves",
        artist: "Glass Animals",
        searchTerm: "heat waves glass animals"
    },
    {
        title: "Fancy Like",
        artist: "Walker Hayes",
        searchTerm: "fancy like walker hayes"
    },
    {
        title: "Bad Habits",
        artist: "Ed Sheeran",
        searchTerm: "bad habits ed sheeran"
    },
    {
        title: "Easy On Me",
        artist: "Adele",
        searchTerm: "easy on me adele"
    },
    {
        title: "As It Was",
        artist: "Harry Styles",
        searchTerm: "as it was harry styles"
    },
    {
        title: "About Damn Time",
        artist: "Lizzo",
        searchTerm: "about damn time lizzo"
    },
    {
        title: "Running Up That Hill",
        artist: "Kate Bush",
        searchTerm: "running up that hill kate bush"
    },
    {
        title: "Hold My Hand",
        artist: "Lady Gaga",
        searchTerm: "hold my hand lady gaga"
    },
    {
        title: "Wait For U",
        artist: "Future ft. Drake & Tems",
        searchTerm: "wait for u future drake tems"
    },
    {
        title: "Golden Hour",
        artist: "JVKE",
        searchTerm: "golden hour jvke"
    },
    {
        title: "Unholy",
        artist: "Sam Smith & Kim Petras",
        searchTerm: "unholy sam smith kim petras"
    },
    {
        title: "Creepin'",
        artist: "Metro Boomin ft. The Weeknd & 21 Savage",
        searchTerm: "creepin metro boomin weeknd 21 savage"
    },
    {
        title: "Sunroof",
        artist: "Nicky Youre & dazy",
        searchTerm: "sunroof nicky youre dazy"
    },
    {
        title: "Me Porto Bonito",
        artist: "Bad Bunny & Chencho Corleone",
        searchTerm: "me porto bonito bad bunny"
    },
    {
        title: "Flowers",
        artist: "Miley Cyrus",
        searchTerm: "flowers miley cyrus"
    },
    {
        title: "Kill Bill",
        artist: "SZA",
        searchTerm: "kill bill sza"
    },
    {
        title: "Calm Down",
        artist: "Rema & Selena Gomez",
        searchTerm: "calm down rema selena gomez"
    },
    {
        title: "Cruel Summer",
        artist: "Taylor Swift",
        searchTerm: "cruel summer taylor swift"
    },
    {
        title: "Escapism",
        artist: "RAYE ft. 070 Shake",
        searchTerm: "escapism raye 070 shake"
    },
    {
        title: "Ella Baila Sola",
        artist: "Eslabon Armado & Peso Pluma",
        searchTerm: "ella baila sola eslabon armado peso pluma"
    },
    {
        title: "Miracle",
        artist: "Calvin Harris & Ellie Goulding",
        searchTerm: "miracle calvin harris ellie goulding"
    },
    {
        title: "Cupid",
        artist: "FIFTY FIFTY",
        searchTerm: "cupid fifty fifty"
    },
    {
        title: "What Was I Made For",
        artist: "Billie Eilish",
        searchTerm: "what was i made for billie eilish"
    },
    {
        title: "I'm Good (Blue)",
        artist: "David Guetta & Bebe Rexha",
        searchTerm: "i'm good blue david guetta bebe rexha"
    },
    {
        title: "Espresso",
        artist: "Sabrina Carpenter",
        searchTerm: "espresso sabrina carpenter"
    },
    {
        title: "APT.",
        artist: "Rose & Bruno Mars",
        searchTerm: "apt rose bruno mars"
    },
    {
        title: "Die With A Smile",
        artist: "Lady Gaga & Bruno Mars",
        searchTerm: "die with a smile lady gaga bruno mars"
    },
    {
        title: "Too Sweet",
        artist: "Hozier",
        searchTerm: "too sweet hozier"
    },
    {
        title: "Please Please Please",
        artist: "Sabrina Carpenter",
        searchTerm: "please please please sabrina carpenter"
    },
    {
        title: "Beautiful Things",
        artist: "Benson Boone",
        searchTerm: "beautiful things benson boone"
    },
    {
        title: "Not Like Us",
        artist: "Kendrick Lamar",
        searchTerm: "not like us kendrick lamar"
    },
    {
        title: "Good Luck Babe",
        artist: "Chappell Roan",
        searchTerm: "good luck babe chappell roan"
    },
    {
        title: "Birds of a Feather",
        artist: "Billie Eilish",
        searchTerm: "birds of a feather billie eilish"
    },
    {
        title: "luther",
        artist: "Kendrick Lamar & SZA",
        searchTerm: "luther kendrick lamar sza"
    },
    {
        title: "Taste",
        artist: "Sabrina Carpenter",
        searchTerm: "taste sabrina carpenter"
    },
    {
        title: "Pink Pony Club",
        artist: "Chappell Roan",
        searchTerm: "pink pony club chappell roan"
    },
    {
        title: "Now & Then",
        artist: "The Beatles",
        searchTerm: "now and then the beatles"
    },
    {
        title: "Nokia",
        artist: "Drake",
        searchTerm: "nokia drake"
    },
    {
        title: "Stargazing",
        artist: "Myles Smith",
        searchTerm: "stargazing myles smith"
    },
    {
        title: "That's So True",
        artist: "Gracie Abrams",
        searchTerm: "thats so true gracie abrams"
    },
    {
        title: "Who",
        artist: "Jimin",
        searchTerm: "who jimin"
    },
    {
        title: "Abracadabra",
        artist: "Lady Gaga",
        searchTerm: "abracadabra lady gaga"
    },
    {
        title: "If U Think I'm Pretty",
        artist: "Sabrina Carpenter",
        searchTerm: "if u think im pretty sabrina carpenter"
    },
    {
        title: "Call Me When You Break Up",
        artist: "Selena Gomez & benny blanco",
        searchTerm: "call me when you break up selena gomez benny blanco"
    },
];
