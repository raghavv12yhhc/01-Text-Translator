import { useState } from "react";
import axios from "axios";
import { LoaderCircle } from 'lucide-react';

const languages = [
  { code: "af", name: "Afrikaans" },
  { code: "ar", name: "Arabic" },
  { code: "bn", name: "Bengali" },
  { code: "zh", name: "Chinese" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch" },
  { code: "en", name: "English" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "hi", name: "Hindi" },
  { code: "hu", name: "Hungarian" },
  { code: "id", name: "Indonesian" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "no", name: "Norwegian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "es", name: "Spanish" },
  { code: "sv", name: "Swedish" },
  { code: "tr", name: "Turkish" },
  { code: "uk", name: "Ukrainian" },
  { code: "vi", name: "Vietnamese" },
];

function App() {
  const [textInput, setTextInput] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextTranslation = async () => {
    setLoading(true);
    try {
      const options = {
        method: "POST",
        url: "https://google-translator9.p.rapidapi.com/v2",
        headers: {
          "x-rapidapi-key": "0e92965842msh6b75d5c18b1038cp1ce525jsne655e0f65191",
          "x-rapidapi-host": "google-translator9.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          q: textInput,
          source: sourceLang,
          target: targetLang,
          format: "text",
        },
      };
      const response = await axios.request(options);
      setLoading(false);
      setResult(response?.data?.data?.translations?.[0]?.translatedText);
    } catch (error) {
      setLoading(false);
      console.error(error?.data);
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-200 flex items-center justify-center">
      <div className="flex items-center justify-center flex-col border bg-gray-300 p-5 rounded-lg">
        <h1 className="text-3xl font-bold">Text Translator</h1>
        <div className="flex flex-col gap-y-4 p-4 ">
          
          <textarea
            name="input-text"
            className="bg-white border h-30 w-[500px] p-2 rounded-md text-2xl"
            placeholder="Enter text..."
            onChange={(e) => setTextInput(e.target.value)}
          />

          
          <textarea
            name="output-text"
            className="bg-white border h-30 w-[500px] p-2 rounded-md text-2xl"
            placeholder="Translation..."
            value={result}
            readOnly
          />

          
          <div className="flex gap-x-4 mx-auto">
            <div className="flex flex-col">
              <label htmlFor="source-lang">From:</label>
              <select
                name="source-lang"
                className="border rounded-md p-1"
                onChange={(e) => setSourceLang(e.target.value)}
                value={sourceLang}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="target-lang">To:</label>
              <select
                name="target-lang"
                className="border rounded-md p-1"
                onChange={(e) => setTargetLang(e.target.value)}
                value={targetLang}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-[120px] mx-auto flex items-center justify-center"
            onClick={handleTextTranslation}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Translate"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
