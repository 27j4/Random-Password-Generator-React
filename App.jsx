import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(6);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null);

  let passwordGenerator = useCallback(() => {
    let s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) {
      s += "0123456789";
    }
    if (charAllowed) {
      s += "~`!@#$%^&*()_-+=:;}{}][>,</?.";
    }
    let len = s.length;
    let pass = "";
    for (let i = 0; i < length; i++) {
      let ran = Math.floor(Math.random() * len);
      pass += s[ran];
    }
    setpassword(pass);
  }, [length, numberAllowed, charAllowed, setpassword]); // setpassword is only for optimisation // memoize kr rha hai

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password); // ye kewal react me ho rha hai / js me
  }, [password]);
  // ya to ek tarika hai ki button lagaye then click kre aur phir call ho jaye
  // ya to ek tarika hai aur hai ki hum ab dusre hook ka use kre
  // useEffect hook
  // synchronise the code

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="h-50 w-2xl bg-cyan-200 p-3 rounded-2xl">
          <h1 className="text-2xl font-bold text-center mb-3">
            Password Generator
          </h1>
          <div className="flex justify-center">
            <input
              type="text"
              readOnly
              placeholder="Password"
              className="border-2 p-2 w-96 bg-red-100 outline-0 rounded-l-sm"
              value={password}
              ref={passwordRef}
            />
            <button
              onClick={copyPassword}
              className="p-2 w-20 border-2 border-l-0 bg-blue-300 outline-0 cursor-pointer hover:bg-sky-400 rounded-r-sm"
            >
              Copy
            </button>
          </div>
          <div className="flex justify-around items-center h-20">
            <div className="flex gap-2 p-2">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => {
                  setlength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex gap-2 p-2">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={(prev) => {
                  setcharAllowed((prev) => !prev);
                }}
              />
              <label>Chacters</label>
            </div>
            <div className="flex gap-2 p-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={(prev) => {
                  setnumberAllowed((prev) => !prev);
                }}
              />
              <label>Numbers</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
