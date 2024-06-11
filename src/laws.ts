export interface Law {
  abbreviation: string;
  fullName: string;
  id: string;
}

export const isLaw = (data: unknown): data is Law => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const law = data as Law;

  return typeof law.abbreviation === 'string' && typeof law.fullName === 'string' && typeof law.id === 'string';
};

export const laws: Law[] = [
  { abbreviation: '印法', fullName: '印紙税法', id: '342AC0000000023' },
  { abbreviation: '印令', fullName: '印紙税法施行令', id: '342CO0000000108' },
  { abbreviation: '行審法', fullName: '行政不服審査法', id: '426AC0000000068' },
  { abbreviation: '行訴法', fullName: '行政事件訴訟法', id: '337AC0000000139' },
  { abbreviation: '財形法', fullName: '勤労者財産形成促進法', id: '346AC0000000092' },
  // { abbreviation: "災免法", fullName: "災害被害者に対する租税の減免、徴収猶予等に関する法律", id: "322AC0000000175" },
  // { abbreviation: "災免令", fullName: "災害被害者に対する租税の減免、徴収猶予等に関する政令", id: "322CO0000000268" },
  { abbreviation: '自法', fullName: '自動車重量税法', id: '346AC0000000089' },
  { abbreviation: '消規', fullName: '消費税法施行規則', id: '363M50000040053' },
  { abbreviation: '消法', fullName: '消費税法', id: '363AC0000000108' },
  { abbreviation: '消令', fullName: '消費税法施行令', id: '363CO0000000360' },
  { abbreviation: '所規', fullName: '所得税法施行規則', id: '340M50000040011' },
  { abbreviation: '所法', fullName: '所得税法', id: '340AC0000000033' },
  { abbreviation: '所令', fullName: '所得税法施行令', id: '340CO0000000096' },
  // { abbreviation: "震災税特法", fullName: "阪神・淡路大震災の被災者等に係る国税関係法律の臨時特例に関する法律", id: "407AC0000000011" },
  { abbreviation: '相規', fullName: '相続税法施行規則', id: '325M50000040017' },
  { abbreviation: '相法', fullName: '相続税法', id: '325AC0000000073' },
  { abbreviation: '相令', fullName: '相続税法施行令', id: '325CO0000000071' },
  { abbreviation: '措規', fullName: '租税特別措置法施行規則', id: '332M50000040015' },
  { abbreviation: '措法', fullName: '租税特別措置法', id: '332AC0000000026' },
  { abbreviation: '措令', fullName: '租税特別措置法施行令', id: '332CO0000000043' },
  { abbreviation: '耐令', fullName: '減価償却資産の耐用年数等に関する省令', id: '340M50000040015' },
  { abbreviation: '通規', fullName: '国税通則法施行規則', id: '337M50000040028' },
  { abbreviation: '通法', fullName: '国税通則法', id: '337AC0000000066' },
  { abbreviation: '通令', fullName: '国税通則法施行令', id: '337CO0000000135' },
  { abbreviation: '登法', fullName: '登録免許税法', id: '342AC0000000035' },
  { abbreviation: '特減法', fullName: '平成10年分所得税の特別減税のための臨時措置法', id: '410AC0000000001' },
  { abbreviation: '法規', fullName: '法人税法施行規則', id: '340M50000040012' },
  { abbreviation: '法法', fullName: '法人税法', id: '340AC0000000034' },
  { abbreviation: '法令', fullName: '法人税法施行令', id: '340CO0000000097' },
  // { abbreviation: "実施特例省令", fullName: "租税条約の実施に伴う所得税法、法人税法及び地方税法の特例等に関する法律の施行に関する省令", id: "344M50000048001" },
  // { abbreviation: "平20年改正附則経過措置令", fullName: "所得税法等の一部を改正する法律附則第119条の2つの規定による経過措置を定める政令", id: "420CO0000000164",},
  { abbreviation: '旅客法', fullName: '国際観光旅客税法', id: '430AC0000000016' },
  { abbreviation: '旅客令', fullName: '国際観光旅客税法施行令', id: '430CO0000000161' },
];
