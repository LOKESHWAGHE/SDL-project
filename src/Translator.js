import React, { useState } from 'react';
import './styles.css';

const Translator = () => {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLang, setFromLang] = useState('en'); // Default: English
  const [toLang, setToLang] = useState('bn'); // Default: Bengali

  const handleTranslate = async () => {
    if (!fromText.trim()) return;
    setToText('Translating...');

    const encodedParams = new URLSearchParams();
    encodedParams.append("q", fromText);
    encodedParams.append("target", toLang);
    encodedParams.append("source", fromLang);

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-rapidapi-key': 'de1a61fc6cmshf33de1e935c763dp1988fcjsn508fb92e5f90', // Replace with your RapidAPI key
        'x-rapidapi-host': 'google-translate1.p.rapidapi.com'
      },
      body: encodedParams
    };

    try {
      const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options);
      const result = await response.json();
      const translatedText = result.data.translations[0].translatedText;
      setToText(translatedText || 'Translation error');
    } catch (error) {
      setToText('Error while translating');
    }
  };

  const handleExchange = () => {
    setFromText(toText);
    setToText(fromText);
    const tempLang = fromLang;
    setFromLang(toLang);
    setToLang(tempLang);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSpeech = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="text-input">
          <textarea
            spellCheck="false"
            className="from-text"
            placeholder="Enter text"
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
          ></textarea>
          <textarea
            spellCheck="false"
            readOnly
            className="to-text"
            placeholder="Translation"
            value={toText}
          ></textarea>
        </div>
        <ul className="controls">
          <li className="row from">
            <div className="icons">
              <i className="fas fa-volume-up" onClick={() => handleSpeech(fromText, fromLang)}></i>
              <i className="fas fa-copy" onClick={() => handleCopy(fromText)}></i>
            </div>
            <select className="change-button" onChange={(e) => setFromLang(e.target.value)}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="bn">Bengali</option>
              <option value="hi">Hindi</option>
              <option value="zh-CN">Chinese</option>
              <option value="ar">Arabic</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="it">Italian</option>
              <option value="nl">Dutch</option>
              <option value="sv">Swedish</option>
              <option value="no">Norwegian</option>
              <option value="da">Danish</option>
              <option value="pl">Polish</option>
              <option value="tr">Turkish</option>
              <option value="uk">Ukrainian</option>
              <option value="fi">Finnish</option>
              <option value="el">Greek</option>
              <option value="he">Hebrew</option>
              <option value="vi">Vietnamese</option>
              <option value="th">Thai</option>
              <option value="ro">Romanian</option>
              <option value="hu">Hungarian</option>
              <option value="cs">Czech</option>
              <option value="sk">Slovak</option>
              <option value="id">Indonesian</option>
              <option value="ms">Malay</option>
              {/* Add more language options as needed */}
            </select>
          </li>
          <li className="exchange" onClick={handleExchange}>
            <i className="fas fa-exchange-alt"></i>
          </li>
          <li className="row to">
            <select onChange={(e) => setToLang(e.target.value)}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="bn">Bengali</option>
              <option value="hi">Hindi</option>
              <option value="zh-CN">Chinese</option>
              <option value="ar">Arabic</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="it">Italian</option>
              <option value="nl">Dutch</option>
              <option value="sv">Swedish</option>
              <option value="no">Norwegian</option>
              <option value="da">Danish</option>
              <option value="pl">Polish</option>
              <option value="tr">Turkish</option>
              <option value="uk">Ukrainian</option>
              <option value="fi">Finnish</option>
              <option value="el">Greek</option>
              <option value="he">Hebrew</option>
              <option value="vi">Vietnamese</option>
              <option value="th">Thai</option>
              <option value="ro">Romanian</option>
              <option value="hu">Hungarian</option>
              <option value="cs">Czech</option>
              <option value="sk">Slovak</option>
              <option value="id">Indonesian</option>
              <option value="ms">Malay</option>
              {/* Add more language options as needed */}
            </select>
            <div className="icons">
              <i className="fas fa-volume-up" onClick={() => handleSpeech(toText, toLang)}></i>
              <i className="fas fa-copy" onClick={() => handleCopy(toText)}></i>
            </div>
          </li>
        </ul>
      </div>
      <button onClick={handleTranslate}>Translate Text</button>
    </div>
  );
};

export default Translator;







// ********************************************************************************************************************












// import React, { useState, useEffect } from 'react';
// import './styles.css';
// import { countries } from './countries';

// const Translator = () => {
//   const [fromText, setFromText] = useState('');
//   const [toText, setToText] = useState('');
//   const [fromLang, setFromLang] = useState('en-GB');
//   const [toLang, setToLang] = useState('bn-IN');

//   useEffect(() => {
//     // Populate select options
//     const selectTags = document.querySelectorAll('select');
//     selectTags.forEach((tag, id) => {
//       Object.keys(countries).forEach((countryCode) => {
//         const selected = id === 0 ? (countryCode === 'en-GB' ? 'selected' : '') : (countryCode === 'bn-IN' ? 'selected' : '');
//         tag.innerHTML += `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`;
//       });
//     });
//   }, []);

//   const handleTranslate = () => {
//     if (!fromText.trim()) return;
//     setToText('Translating...');
//     const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fromText)}&langpair=${fromLang}|${toLang}`;
//     fetch(apiUrl)
//       .then((res) => res.json())
//       .then((data) => {
//         setToText(data.responseData.translatedText || 'Translation error');
//       })
//       .catch(() => {
//         setToText('Error while translating');
//       });
//   };

//   const handleExchange = () => {
//     setFromText(toText);
//     setToText(fromText);
//     const tempLang = fromLang;
//     setFromLang(toLang);
//     setToLang(tempLang);
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   const handleSpeech = (text, lang) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = lang;
//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <div className="container">
//       <div className="wrapper">
//         <div className="text-input">
//           <textarea
//             spellCheck="false"
//             className="from-text"
//             placeholder="Enter text"
//             value={fromText}
//             onChange={(e) => setFromText(e.target.value)}
//           ></textarea>
//           <textarea
//             spellCheck="false"
//             readOnly
//             className="to-text"
//             placeholder="Translation"
//             value={toText}
//           ></textarea>
//         </div>
//         <ul className="controls">
//           <li className="row from">
//             <div className="icons">
//               <i className="fas fa-volume-up" onClick={() => handleSpeech(fromText, fromLang)}></i>
//               <i className="fas fa-copy" onClick={() => handleCopy(fromText)}></i>
//             </div>
//             <select className="change-button" onChange={(e) => setFromLang(e.target.value)}></select>
//           </li>
//           <li className="exchange" onClick={handleExchange}>
//             <i className="fas fa-exchange-alt"></i>
//           </li>
//           <li className="row to">
//             <select onChange={(e) => setToLang(e.target.value)}></select>
//             <div className="icons">
//               <i className="fas fa-volume-up" onClick={() => handleSpeech(toText, toLang)}></i>
//               <i className="fas fa-copy" onClick={() => handleCopy(toText)}></i>
//             </div>
//           </li>
//         </ul>
//       </div>
//       <button onClick={handleTranslate}>Translate Text</button>
//     </div>
//   );
// };

// export default Translator;

