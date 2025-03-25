import React, { useEffect } from 'react';

const TranslateComponent = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector('#google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    const initGoogleTranslate = () => {
      if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en', // Set the default language of your website
              includedLanguages: 'en,hi', // List of languages you want to support
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            'google_translate_element'
          );
        };
      }
    };

    const addCustomStyles = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        body {
          top: 0px !important;
          // display: none !important;
        }
      `;
      document.head.appendChild(style);
    };

    addGoogleTranslateScript();
    initGoogleTranslate();
    addCustomStyles();
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        height: '20px',
        overflow: 'hidden',
      }}
    ></div>
  );
};

export default TranslateComponent;