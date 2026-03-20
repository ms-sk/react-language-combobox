import { GB, US, DE, FR, ES, IT, JP, CN, PT, RU, KR, NL, SE, NO, DK } from 'country-flag-icons/react/3x2';
import React from 'react';

export interface FlagProps {
  language?: string;
  svg?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

export default function Flag({ language, className, title }: FlagProps){
 
  if(!language) return null;

    function GetFlag(lang: string): React.ReactNode {
      switch (lang) {
        case 'en':
          return <GB className={className} />;
        case 'en-us':
        case 'en_us':
        case 'en-US':
          return <US  className={className} />;
        case 'de':
          return <DE  className={className}/>;
        case 'fr':
          return <FR  className={className}/>;
        case 'es':
          return <ES  className={className}/>;
        case 'it':
          return <IT  className={className}/>;
        case 'ja':
        case 'jp':
          return <JP  className={className}/>;
        case 'zh':
        case 'zh-cn':
        case 'zh_CN':
          return <CN  className={className}/>;
        case 'pt':
          return <PT  className={className}/>;
        case 'ru':
          return <RU  className={className}/>;
        case 'ko':
        case 'kr':
          return <KR  className={className}/>;
        case 'nl':
          return <NL  className={className}/>;
        case 'sv':
          return <SE  className={className} />;
        case 'no':
          return <NO  className={className}/>;
        case 'da':
          return <DK className={className} />;
        default:
          return null;
      }
    }

  return <span title={title ?? language}>{GetFlag(language)}</span>;
}
