const kansujiToArabic = (value: string) => {
  const kanjiToNum = (kanji: string) => {
    const kanjiDigits = "〇一二三四五六七八九";
    return kanjiDigits.indexOf(kanji);
  };

  return value.replace(/[一二三四五六七八九〇十百]+/g, (match) => {
    let result = 0;
    let temp = 0;

    for (let i = 0; i < match.length; i++) {
      const currentChar = match[i];
      if (currentChar === "百") {
        result += (temp || 1) * 100;
        temp = 0;
      } else if (currentChar === "十") {
        result += (temp || 1) * 10;
        temp = 0;
      } else {
        temp = temp * 10 + kanjiToNum(currentChar);
      }
    }

    result += temp;
    return result.toString();
  });
};

const convertArticleNum = (value: string) => {
  const matches = value.match(/([^0-9]*)(\d+)([^0-9]*)(\d*)([^0-9]*)/);
  if (!matches) {
    return "";
  }
  const [, , num1, , num2, suffix] = matches;

  // suffixが項、号である場合、num1のみ返す
  if (suffix === "項" || suffix === "号") {
    return num1;
  } else {
    const result = num2 ? `${num1}_${num2}` : num1;
    return result;
  }
};

const generateLinkEGov = (lawId: string, articleNum: string) => {
  const baseUrl = "https://elaws.e-gov.go.jp/document?lawid="
  const arabicArticleNum = kansujiToArabic(articleNum);
  const convertedNum = convertArticleNum(arabicArticleNum);

  return `${baseUrl}${lawId}#Mp-At_${convertedNum}`;
};

export default generateLinkEGov;
