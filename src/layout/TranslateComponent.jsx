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

    addGoogleTranslateScript();
    initGoogleTranslate();
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        height: '40px',
        overflow: 'hidden',
      }}
    ></div>
  );
};

export default TranslateComponent;