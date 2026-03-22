import { GB, US, CN, TW, HK, IN, BD, PK, ES, MX, FR, SA, RU, PT, BR, ID, DE, JP, KE, VN, KR, IT, PL, UA, IR, MY, MM, NG, RO, NL, GR, CZ, HU, BG, SE, DK, FI, NO, SK, HR, RS, LT, LV, EE, SI, BA, AL, MK, AM, AZ, GE, KZ, UZ, BY, KG, TJ, MN, NP, LK, KH, LA, MG, ZA, IE, PH, SO, TR, TH } from 'country-flag-icons/react/3x2';
import React from 'react';

export interface FlagProps {
  language?: string;
  svg?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

export default function Flag({ language, className, title }: FlagProps) {

  if (!language) return null ;

  function GetFlag(lang: string): React.ReactNode {
    const flagComponents: Record<string, React.ComponentType<{ className?: string }>> = {
      'en': GB, 'en-us': US, 'en-gb': GB,
      'zh': CN, 'zh-cn': CN, 'zh-tw': TW, 'zh-hk': HK,
      'hi': IN, 'bn': BD, 'ur': PK, 'id': ID, 'ms': MY, 'my': MM, 'ta': IN, 'te': IN, 'mr': IN, 'kn': IN, 'pa': IN,
      'es': ES, 'es-mx': MX, 'fr': FR, 'de': DE, 'it': IT, 'pt': PT, 'pt-br': BR, 'nl': NL, 'pl': PL, 'ru': RU,
      'uk': UA, 'ro': RO, 'cs': CZ, 'hu': HU, 'bg': BG, 'sv': SE, 'da': DK, 'fi': FI, 'no': NO, 'el': GR,
      'hr': HR, 'sr': RS, 'sk': SK, 'sl': SI, 'lt': LT, 'lv': LV, 'et': EE, 'bs': BA, 'sq': AL, 'mk': MK,
      'ar': SA, 'fa': IR, 'hy': AM, 'az': AZ, 'ka': GE, 'kk': KZ, 'uz': UZ, 'be': BY, 'ky': KG, 'tg': TJ,
      'sw': KE, 'ha': NG, 'yo': NG, 'so': SO, 'zu': ZA, 'xh': ZA,
      'ja': JP, 'ko': KR, 'vi': VN, 'th': TH, 'km': KH, 'lo': LA, 'mn': MN,
      'ne': NP, 'si': LK, 'ph': PH, 'tl': PH, 'fil': PH, 'mg': MG, 'ie': IE, 'tr': TR,
    };

    const key = lang.toLowerCase();
    const Comp = flagComponents[key] ?? flagComponents[key.split('-')[0]];
    return Comp ? <Comp className={className} /> : null;
  }

  return <span className={className} title={title ?? language}>{GetFlag(language)}</span>;
}
