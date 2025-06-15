// Caesar cipher
export const caesarCipher = {
  encrypt: (text: string, shift: number): string => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          let shiftedCode;
          if (code >= 65 && code <= 90) { // Uppercase
            shiftedCode = ((code - 65 + shift) % 26) + 65;
          } else if (code >= 97 && code <= 122) { // Lowercase
            shiftedCode = ((code - 97 + shift) % 26) + 97;
          } else {
            return char; // Not a letter
          }
          return String.fromCharCode(shiftedCode);
        }
        return char;
      })
      .join("");
  },

  decrypt: (text: string, shift: number): string => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          let shiftedCode;
          if (code >= 65 && code <= 90) { // Uppercase
            shiftedCode = ((code - 65 - shift + 26) % 26) + 65;
          } else if (code >= 97 && code <= 122) { // Lowercase
            shiftedCode = ((code - 97 - shift + 26) % 26) + 97;
          } else {
            return char; // Not a letter
          }
          return String.fromCharCode(shiftedCode);
        }
        return char;
      })
      .join("");
  },
};

// Vigenère cipher
export const vigenereCipher = {
  encrypt: (text: string, key: string): string => {
    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const plainChar = char.toLowerCase();
        const plainCode = plainChar.charCodeAt(0) - 97;

        const keyChar = key[keyIndex % key.length].toLowerCase();
        const keyCode = keyChar.charCodeAt(0) - 97;

        const encryptedCode = (plainCode + keyCode) % 26;
        const encryptedChar = String.fromCharCode(encryptedCode + 97);

        result += isUpperCase ? encryptedChar.toUpperCase() : encryptedChar;
        keyIndex++;
      } else {
        result += char;
      }
    }

    return result;
  },

  decrypt: (text: string, key: string): string => {
    let result = "";
    let keyIndex = 0;
    const sanitizedKey = key.replace(/[^a-z]/gi, "").toLowerCase(); // <-- fix

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const encryptedChar = char.toLowerCase();
        const encryptedCode = encryptedChar.charCodeAt(0) - 97;

        const keyChar = sanitizedKey[keyIndex % sanitizedKey.length]; // <-- use sanitized key
        const keyCode = keyChar.charCodeAt(0) - 97;

        let decryptedCode = (encryptedCode - keyCode + 26) % 26;
        const decryptedChar = String.fromCharCode(decryptedCode + 97);

        result += isUpperCase ? decryptedChar.toUpperCase() : decryptedChar;
        keyIndex++;
      } else {
        result += char;
      }
    }
    console.log("Decrypted text:", result);
    return result;
  },
};
