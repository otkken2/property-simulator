const TermsHudousansyutokuzei = () => {
  return (
    <div>
      <p>
        登録免許税は、不動産の登記をする際にかかる税金です。登記の対象や種類、取得方法などによって、かかる税率が異なります。
      </p>
      <p>
        登録免許税の計算方法は、不動産の価格（課税額）に税率を掛けた額となります。税率は、登記の種類によって異なります:
      </p>
      <br />
      <ul>
        <li>
          <span className="font-bold">相続登記の場合</span>......不動産価格（固定資産税評価額）の0.4%
        </li>
        <li>
          <span className="font-bold">所有権移転登記の場合</span>......2%
        </li>
        <li>
          <span className="font-bold">抵当権登記の場合</span>.......住宅ローンで借り入れた金額の0.4%
        </li>
        <li>
          <span className="font-bold">贈与登記の場合</span>......固定資産税評価額の2%
        </li>
      </ul>
      <br />
      <p>
        <span className="font-bold">登録免許税の最低金額は1,000円です。</span>課税標準に税率を掛けた金額が1,000円未満であった場合は、その登録免許税は1,000円になります。
      </p>
      登録免許税は、登記の申請時に納付します。登記費用とは、登録免許税＋司法書士への代行手数料のことです。
    </div>
  );
};

export default TermsHudousansyutokuzei;