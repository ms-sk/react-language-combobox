import { GB, US, CN, TW, HK, IN, BD, PK, ES, MX, FR, SA, RU, PT, BR, ID, DE, JP, KE, VN, KR, IT, PL, UA, IR, MY, MM, NG, RO, NL, GR, CZ, HU, BG, SE, DK, FI, NO, SK, HR, RS, LT, LV, EE, SI, BA, AL, MK, AM, AZ, GE, KZ, UZ, BY, KG, TJ, MN, NP, LK, KH, LA, MG, ZA, IE, PH, SO, TR, TH } from 'country-flag-icons/react/3x2';
import React from 'react';

export interface FlagProps {
  language?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

const GlobeIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 30 20" 
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: 'block',
      borderRadius: '1px',
      overflow: 'hidden',
    }}
  >
    <rect width="30" height="20" fill="#F1F5F9" />
    <g transform="translate(7, 2)" fill="none" stroke="#64748B" strokeWidth="1.2">
      <circle cx="8" cy="8" r="7.5" />
      <line x1="0.5" y1="8" x2="15.5" y2="8" />
      <line x1="8" y1="0.5" x2="8" y2="15.5" />
      <path d="M8 0.5C9.5 3 10.5 5.5 10.5 8C10.5 10.5 9.5 13 8 15.5" />
      <path d="M8 0.5C6.5 3 5.5 5.5 5.5 8C5.5 10.5 6.5 13 8 15.5" />
    </g>
  </svg>
);

export default function Flag({ language, className, style, title }: FlagProps) {
  if (!language) return null;

  const getFlagComponent = (lang: string) => {
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
    // Lookup full key first, then fallback to prefix (e.g. 'en-AU' -> 'en')
    const Comp = flagComponents[key] ?? flagComponents[key.split('-')[0]];
    
    return Comp ? <Comp className="w-full h-full block" /> : <GlobeIcon />;
  };

  return (
    <span 
      className={className} 
      title={title ?? language}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        verticalAlign: 'middle',
        ...style 
      }}
    >
      {getFlagComponent(language)}
    </span>
  );
}