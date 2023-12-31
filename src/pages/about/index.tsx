import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import styles from './about.module.scss';

function About() {
  const { t } = useTranslation();

  return (
    <Container className={`${styles.container} d-flex flex-column`}>
      {/* <div>
        <h1>
          «ԲԵՍԹ ՍԻՍԹԵՄՍ»
        </h1>
        <p>
          «Բեսթ Սիսթեմս» ընկերությունն աշխատում է 2016 թվականից ինժեներական համակարգերի շուկայում: Աշխատանքում և կյանքում մենք առաջնորդվում ենք «նոր նպատակներ՝ բարձր նվաճումներ» կարգախոսով:
          «Best Systems» ընկերությունը հանդիսանում է հանրահայտ եվրոպական «Partizan Security» և ռուսական «Метаком» բրենդների պաշտոնական ներկայացուցիչը Հայաստանում։ Ընկերությունը զբաղվում է անվտանգության համակարգերի (տեսախցիկների, մուտքի հսկման համակարգերի, խոսակցասարքերի) ներմուծմամբ, վաճառքով և տեղադրմամբ։
          Յուրաքանչյուր հաճախորդի և ծրագրի համար մենք ցուցաբերում ենք անհատական մոտեցում՝ պահպանելով վերջնաժամկետները և ստանալով անհրաժեշտ արդյունքը: Ընկերությունում առկա է PMI միջազգային ստանդարտով նախագծերի կառավարման համակարգ, որը մեզ թույլ է տալիս իրականացնել նախագծերը` նվազագույն ծախսերով և անհրաժեշտ ժամկետներում: Մենք պատասխանատու ենք մեր կատարած բոլոր նախագծերի համար:
        </p>
        <p>
          Ղեկավար
          Վանուշ Խաչատրյան, հիմնադիր
        </p>
        <h5>Կոնտակտային տվյալներ</h5>
        <b>
          Գրասենյակ և խանութ Երևանում
        </b>
        <p>
          Հայաստան, 0070, Երևան
          Վարդանանց փող., 28 շենք
          (Կենտրոն վարչ. շրջան)
          Երկ Երք Չրք Հնգ Ուրբ Շբթ Կիր 09:00-19:00
        </p>
        <p>
          խանութ`
          +374-96-424643(բջջ.) <br />
          գրասենյակ (09:00-18:00)`
          +374-77-424643(բջջ.)
        </p>
        <h2>Գործունեություն</h2>
        <h5>Ընդհանուր գործունեություն</h5>
        <p>Էլեկտրամոնտաժային աշխատանքներ։ Անվտանգության համակարգերի ներմուծում,
          վաճառք և տեղադրում։ Մետաղե իրերի և կոնստրուկցիաների, ալյումինե պրոֆիլների, դռների, ավտոմեքենաների անվասկավառակների փոշեներկում</p>
        <h5>Ապրանքանիշեր, բրենդներ, գործընկերներ</h5>
        <ul>
          <li>«ՊԱՐՏԻԶԱՆ» ("PARTIZAN", Եվրոպա), պաշտոնական ներկայացուցիչ (թվային տեսագրող սարք)</li>
          <li>«ՄԵՏԱԿՈՄ» ("METAKOM", Ռուսաստան), պաշտոնական ներկայացուցիչ</li>
          <li>«ՄԱՅԵՐՍ» ("MYERS", Եվրոպա), պաշտոնական ներկայացուցիչ (շքամուտքի հսկման խոսակցասարքեր)</li>
          <li>«ԱՐՄՎԻԺՆ» (Հայաստան), սեփականատեր (շքամուտքի հսկման խոսակցասարքեր)</li>
          <li>«ՏԻՏԱՆ» ("TITAN", Հայաստան), գործընկեր (անջատիչներ և վարդակներ)</li>
          <li>«ՇՆԱՅԴԵՐ ԷԼԵԿՏՐԻԿ» ("SCHNEIDER ELECTRIC", Ֆրանսիա), գործընկեր (անջատիչներ և վարդակներ)</li>
          <li>«ՕՎԻՎՈ» ("OVIVO"), գործընկեր (անջատիչներ և վարդակներ)</li>
          <li>«ԻԷԿ» ("IEK"), գործընկեր (անջատիչներ, վարդակներ, ավտոմատ անջատիչներ)</li>
          <li>«ԷՅ-ԲԻ-ԲԻ» ("ABB"), գործընկեր (ավտոմատ անջատիչներ)</li>
          <li>«ԱՆԴԵԼԻ» ("ANDELI", Չինաստան), գործընկեր (փոխակերպիչներ)</li>
          <li>«ՍԻԹՈՐՉ» ("CTORCH"), գործընկեր (լուսատեխնիկա)</li>
        </ul>
        <h5>Ապրանքներ, ծառայություններ</h5>
        <ul>
          <li>Անվտանգության (պահպանական) ահազանգման/ազդանշանային համակարգերի մոնտաժում/տեղակայում/տեղադրում</li>
          <li>Անվտանգության (պահպանության) համակարգերի մոնտաժում/տեղակայում/տեղադրում</li>
          <li>Ապրանքները գողությունից պաշտպանող համակարգերի մոնտաժում/տեղակայում/տեղադրում</li>
          <li>Շքամուտքի հսկման խոսակցասարքերի մոնտաժում/տեղակայում/տեղադրում</li>
          <li>Տեսահսկման համակարգերի (CCTV) մոնտաժում/տեղակայում/տեղադրում</li>
          <li>Նյութերի, պատրաստվածքների, մակերևույթների մշակում</li>
          <li>Փոշեներկում</li>
        </ul>
        <h5>
          Հիմնադրման տարի
        </h5>
        2016
      </div> */}
      <i>{t("about")}</i>
    </Container>
  );
}

export default About;
