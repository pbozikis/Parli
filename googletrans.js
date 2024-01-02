/**
 * USING GOOGLETRANS LIBRARY
 * The languages that Google Translate supports (as of 5/15/16) alongside with their ISO 639-1 codes
 * See https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 */

 const langs = {
  // auto: "Automatic",
  af: "Afrikaans",
  sq: "Albanian",
  am: "Amharic",
  ar: "Arabic",
  hy: "Armenian",
  as: "Assamese", //new
  ay: "Aymara",  //new
  az: "Azerbaijani",
  eu: "Basque",
  bm: "Bambara", //new
  be: "Belarusian",
  bn: "Bengali",
  bho: "Bhojpuri", //new
  bs: "Bosnian",
  bg: "Bulgarian",
  ca: "Catalan",
  ceb: "Cebuano",
  ny: "Chichewa",
  zh: "Chinese",
  co: "Corsican",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  dv: "Dhivehi", //new
  doi: "Dogri", //new
  nl: "Dutch",
  en: "English",
  eo: "Esperanto",
  et: "Estonian",
  ee: "Ewe", //new
  tl: "Filipino",
  fi: "Finnish",
  fr: "French",
  fy: "Frisian",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  gn: "Guarani", //new
  ht: "Haitian Creole",
  ha: "Hausa",
  haw: "Hawaiian",
  he: "Hebrew",
  // iw: "Hebrew",
  hi: "Hindi",
  hmn: "Hmong",
  hu: "Hungarian",
  is: "Icelandic",
  ig: "Igbo",
  ilo: "Ilocano", //new
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  jw: "Javanese",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  rw: "Kinyarwanda", //new
  gom: "Konkani", // new
  ko: "Korean",
  kri: "Krio", //new
  ku: "Kurdish (Kurmanji)",
  ky: "Kyrgyz",
  ln: "Lingala", //new
  lo: "Lao",
  la: "Latin",
  lv: "Latvian",
  lt: "Lithuanian",
  lg: "Luganda", //new
  lb: "Luxembourgish",
  mk: "Macedonian",
  mai: "Maithili", //new
  mg: "Malagasy",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mi: "Maori",
  mr: "Marathi",
  "mni-Mtei": "Meiteilon (Manipuri)", // new
  lus: "Mizo", //new
  mn: "Mongolian",
  my: "Myanmar (Burmese)",
  ne: "Nepali",
  no: "Norwegian",
  or: "Odio (Oriya)", // new
  om: "Oromo", //new
  ps: "Pashto",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese",
  pa: "Punjabi",
  qu: "Quechua", //new
  ro: "Romanian",
  ru: "Russian",
  sm: "Samoan",
  sa: "Sanskrit", //new
  gd: "Scots Gaelic",
  nso: "Sepedi", //new
  sr: "Serbian",
  st: "Sesotho",
  sn: "Shona",
  sd: "Sindhi",
  si: "Sinhala",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somali",
  es: "Spanish",
  su: "Sundanese",
  sw: "Swahili",
  sv: "Swedish",
  tg: "Tajik",
  ta: "Tamil",
  tt: "Tatar", // new
  te: "Telugu",
  th: "Thai",
  ti: "Tigrinya", //new
  ts: "Tsonga", //new
  tr: "Turkish",
  tk: "Turkmen", //new
  ak: "Twi", //new
  uk: "Ukrainian",
  ur: "Urdu",
  ug: "Uyghur", //new
  uz: "Uzbek",
  vi: "Vietnamese",
  cy: "Welsh",
  xh: "Xhosa",
  yi: "Yiddish",
  yo: "Yoruba",
  zu: "Zulu",
};

/**
 * Returns the ISO 639-1 code of the desiredLang – if it is supported by Google Translate
 * @param {string} desiredLang – the name or the code of the desired language
 * @returns {string} The ISO 639-1 code of the language ,if the language is not supported return "UNSUPPORTED"
 */
function getCode(desiredLang) {
  const unSupported = "UNSUPPORTED";
  const lowerLanguage = desiredLang.toLowerCase();

  if (typeof langs[lowerLanguage] !== "undefined") {
    return lowerLanguage;
  }

  const keys = Object.keys(langs).filter((key) => {
    return langs[key].toLowerCase() === lowerLanguage;
  });

  if (typeof keys[0] === "undefined") return unSupported;

  return keys[0];
}

/**
 * Returns true if the desiredLang is supported by Google Translate and false otherwise
 * @param desiredLang – the ISO 639-1 code or the name of the desired language
 * @returns {boolean}
 */
function isSupported(desiredLang) {
  const code = getCode(desiredLang);
  if (typeof code !== "undefined" && code !== "UNSUPPORTED") {
    return true;
  } else {
    return false;
  }
}

const userAgents = {
  browsers: {
    chrome: [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36",
      "Mozilla/5.0 (X11; OpenBSD i386) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.517 Safari/537.36",
      "Mozilla/5.0 (X11; CrOS i686 4319.74.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36",
      "Mozilla/5.0 (X11; NetBSD) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36",
    ],
    opera: [
      "Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16",
      "Opera/9.80 (Windows NT 6.1; U; es-ES) Presto/2.9.181 Version/12.00",
      "Opera/9.80 (Windows NT 5.1; U; en) Presto/2.9.168 Version/11.51",
      "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; de) Opera 11.51",
      "Opera/9.80 (X11; Linux x86_64; U; fr) Presto/2.9.168 Version/11.50",
      "Opera/9.80 (X11; Linux i686; U; hu) Presto/2.9.168 Version/11.50",
      "Mozilla/5.0 (Windows NT 5.1; U; en; rv:1.8.1) Gecko/20061208 Firefox/5.0 Opera 11.11",
      "Opera/9.80 (X11; Linux x86_64; U; bg) Presto/2.8.131 Version/11.10",
      "Opera/9.80 (X11; Linux i686; U; ja) Presto/2.7.62 Version/11.01",
      "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; de) Opera 11.01",
      "Opera/9.80 (Windows NT 6.1; U; zh-cn) Presto/2.6.37 Version/11.00",
    ],
    firefox: [
      "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
      "Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/31.0",
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:21.0) Gecko/20130331 Firefox/21.0",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0",
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:17.0) Gecko/20100101 Firefox/17.0.6",
    ],
    internetexplorer: [
      "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
      "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0;  rv:11.0) like Gecko",
      "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0",
      "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 7.0; InfoPath.3; .NET CLR 3.1.40767; Trident/6.0; en-IN)",
    ],
    safari: [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A",
      "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.3 Safari/534.53.10",
      "Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko ) Version/5.1 Mobile/9B176 Safari/7534.48.3",
      "Mozilla/5.0 (Windows; U; Windows NT 6.1; tr-TR) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27",
      "Mozilla/5.0 (Windows; U; Windows NT 6.1; ko-KR) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27",
      "Mozilla/5.0 (Windows; U; Windows NT 6.1; fr-FR) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27",
    ],
  },
};

/**
 * Generating a Random User Agent
 * @return {String} - User Agent string
 */
function getUserAgent() {
  const browsers = userAgents["browsers"];
  const browsersKeys = Object.keys(browsers);
  const browserNmb = getRandom(0, browsersKeys.length - 1);
  const browsersKey = browsersKeys[browserNmb];
  const userAgenLength = browsers[browsersKey].length - 1;
  const userAgentNmb = getRandom(0, userAgenLength);
  return browsers[browsersKey][userAgentNmb];
}

/**
 * Get an integer number between n and m.
 * @param {number} n - Min integer number
 * @param {number} m - Max integer number
 * @returns {number} - random number
 */
function getRandom(n, m) {
  let num = Math.floor(Math.random() * (m - n + 1) + n);
  return num;
}

function TL(a) {
  var b = 406644;
  var b1 = 3293161072;

  var jd = ".";
  var $b = "+-a^+6";
  var Zb = "+-3^+b+-f";

  for (var e = [], f = 0, g = 0; g < a.length; g++) {
    var m = a.charCodeAt(g);
    128 > m
      ? (e[f++] = m)
      : (2048 > m
          ? (e[f++] = (m >> 6) | 192)
          : (55296 == (m & 64512) &&
            g + 1 < a.length &&
            56320 == (a.charCodeAt(g + 1) & 64512)
              ? ((m = 65536 + ((m & 1023) << 10) + (a.charCodeAt(++g) & 1023)),
                (e[f++] = (m >> 18) | 240),
                (e[f++] = ((m >> 12) & 63) | 128))
              : (e[f++] = (m >> 12) | 224),
            (e[f++] = ((m >> 6) & 63) | 128)),
        (e[f++] = (m & 63) | 128));
  }
  var c = b;
  for (f = 0; f < e.length; f++) (c += e[f]), (c = RL(c, $b));
  c = RL(c, Zb);
  c ^= b1 || 0;
  0 > c && (c = (c & 2147483647) + 2147483648);
  c %= 1e6;
  return c.toString() + jd + (c ^ b);
}

function RL(a, b) {
  var t = "a";
  var Yb = "+";
  for (var c = 0; c < b.length - 2; c += 3) {
    var d = b.charAt(c + 2);
    var e = d >= t ? d.charCodeAt(0) - 87 : Number(d);
    var f = b.charAt(c + 1) == Yb ? a >>> e : a << e;
    a = b.charAt(c) == Yb ? (a + f) & 4294967295 : a ^ f;
  }
  return a;
}

function getToken(t) {
  return TL(t);
}

const qs = require("qs");
const axios = require("axios");
const adapter = require("axios/lib/adapters/http");



/**
 * Translation
 * @param text - The text to be translated.
 * @param options - The translation options. If the param is string, mean the language you want to translate into. If the param is object，can set more options.
 */
function googletrans(text, options = undefined) {
  let a;
  if (typeof options === "string") {
    a = { to: options };
  } else {
    a = options;
  }
  return translate(text, a);
}

/**
 * @param {string} text - The text to be translated
 * @param {Object} opts - Options
 * @return {Promise} - Axios Promise
 */
async function translate(text, opts = undefined) {
  let _opts = opts || {};
  let _text = text;
  let e = undefined;
  const FROMTO = [_opts["from"], _opts["to"]];
  FROMTO.forEach((lang) => {
    if (lang && !isSupported(lang)) {
      e = new Error(`The language 「${lang}」is not suppored!`);
      throw e;
    }
  });

  if (Array.isArray(_text)) {
    // let str = "";
    // for (let i = 0; i < _text.length; i++) {
    //   const t = _text[i];
    //   if (t.length === 0 && i === 0) {
    //     const e = new Error(
    //       "The first element of the text array is an empty string."
    //     );
    //     throw e;
    //   } else {
    //     str += t + ".\n";
    //   }
    // }
    // _text = str;
    _text = _text.join("\n");
  }

  if (_text.length === 0) {
    e = new Error(`The text to be translated is empty!`);
    throw e;
  }
  if (_text.length > 15000) {
    e = new Error(`The text is over the maximum character limit ( 15k )!`);
    throw e;
  }

  _opts.from = _opts.from || "auto";
  _opts.to = _opts.to || "en";
  _opts.tld = _opts.tld || "com";
  _opts.client = _opts.client || "t";

  _opts.from = getCode(_opts.from);
  _opts.to = getCode(_opts.to);
  const URL = "https://translate.google." + _opts.tld + "/translate_a/single";
  const TOKEN = getToken(_text);

  const PARAMS = {
    client: _opts.client,
    sl: _opts.from,
    tl: _opts.to,
    hl: "en",
    dt: ["at", "bd", "ex", "ld", "md", "qca", "rw", "rm", "ss", "t"],
    ie: "UTF-8",
    oe: "UTF-8",
    otf: 1,
    ssel: 0,
    tsel: 0,
    kc: 7,
    q: _text,
    tk: TOKEN,
  };

  const HEADERS = {
    "User-Agent": getUserAgent(),
    "Accept-Encoding": "gzip",
  };

  const res = await axios({
    adapter,
    url: URL,
    params: PARAMS,
    headers: HEADERS,
    timeout: 3 * 1000,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
  return getResult(res);
}

// async function translate2(text, opts = undefined)
// {
//   let _opts = opts || {};
//   let _text = text;
//   let e = undefined;
//   // FROMTO.forEach((lang) => {
//   //   if (lang && !isSupported(lang)) {
//   //     e = new Error(`The language 「${lang}」is not suppored!`);
//   //     throw e;
//   //   }
//   // });

//   if (Array.isArray(_text)) {    
//     _text = _text.join(".\n");
//   }

//   if (_text.length === 0) {
//     e = new Error(`The text to be translated is empty!`);
//     throw e;
//   }
//   if (_text.length > 15000) {
//     e = new Error(`The text is over the maximum character limit ( 15k )!`);
//     throw e;
//   }

//   _opts.from = _opts.from || "auto";
//   _opts.to = _opts.to || "en";
//   _opts.tld = _opts.tld || "com";
//   _opts.client = _opts.client || "t";

//   _opts.from = getCode(_opts.from);
//   _opts.to = getCode(_opts.to);
//   const URL = "https://translate.google." + _opts.tld + "/translate_a/single";
//   const TOKEN = getToken(_text);

//   const PARAMS = {
//     client: _opts.client,
//     sl: _opts.from,
//     tl: _opts.to,
//     hl: "en",
//     dt: ["at", "bd", "ex", "ld", "md", "qca", "rw", "rm", "ss", "t"],
//     ie: "UTF-8",
//     oe: "UTF-8",
//     otf: 1,
//     ssel: 0,
//     tsel: 0,
//     kc: 7,
//     q: _text,
//     tk: TOKEN,
//   };
//   const params = `client=${_opts.client}&sl=${_opts}`

//   const HEADERS = {
//     "User-Agent": getUserAgent(),
//     "Accept-Encoding": "gzip",
//   };

//   const res = await axios({
//     adapter,
//     url: URL,
//     params: PARAMS,
//     headers: HEADERS,
//     timeout: 3 * 1000,
//     paramsSerializer: (params) => {
//       return qs.stringify(params, { arrayFormat: "repeat" });
//     },
//   });
//   return getResult(res);

// }

function getResult(res) {
  let result = {
    text: "",
    textArray: [],
    pronunciation: "",
    hasCorrectedLang: false,
    src: "",
    hasCorrectedText: false,
    correctedText: "",
    translations: [],
    raw: [],
  };

  if (res === null) return result;
  if (res.status === 200) result.raw = res.data;
  const body = res.data;
  // console.log(JSON.stringify(body));
  body[0].forEach((obj) => {
    if (obj[0]) {
      result.text += obj[0];
    }
    if (obj[2]) {
      result.pronunciation += obj[2];
    }
  });

  if (body[2] === body[8][0][0]) {
    result.src = body[2];
  } else {
    result.hasCorrectedLang = true;
    result.src = body[8][0][0];
  }

  if (body[1] && body[1][0][2]) result.translations = body[1][0][2];

  if (body[7] && body[7][0]) {
    let str = body[7][0];
    str = str.replace(/<b><i>/g, "[");
    str = str.replace(/<\/i><\/b>/g, "]");
    result.correctedText = str;

    if (body[7][5]) result.hasCorrectedText = true;
  }

  if (result.text.indexOf("\n") !== -1) {
    result.textArray = result.text.split("\n");
  } else {
    result.textArray.push(result.text);
  }
  return result;
}

module.exports = { googletrans, translate, getResult, langs };