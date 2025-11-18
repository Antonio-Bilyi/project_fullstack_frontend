// стилі
import css from "./page.module.css";
// компоненти
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import Join from "@/components/Join/Join";

export default function Home() {
  const travelers = [
    {
      _id: {
        $oid: "6881563901add19ee16fcff5",
      },
      name: "Дмитро Романенко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff5.webp",
      articlesAmount: 13,
      description:
        "Привіт! Я Дмитро. Люблю знаходити приховані перлини у кожній поїздці та ділитися ними. Світ повний дивовижних відкриттів!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd017",
      },
      name: "Матвій Савченко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd017.webp",
      articlesAmount: 20,
      description:
        "Мене звати Матвій. Почав ділитися враженнями. Захоплююсь красою нашого світу та шукаю гармонію в кожній миті. Радий надихати.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd010",
      },
      name: "Назар Романенко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd010.webp",
      articlesAmount: 24,
      description:
        "Я Назар. Світ на смак – мій девіз! У моїх історіях я досліджую культуру через її автентичні прояви. Буде дуже смачно!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd009",
      },
      name: "Єва Поліщук",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd009.webp",
      articlesAmount: 21,
      description:
        "Я Єва. Подорожую та відкриваю світ. Мої історії – про сміливість, красу та натхнення. Вірте у власні мрії та йдіть за ними!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcffb",
      },
      name: "Дарина Ковальчук",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffb.webp",
      articlesAmount: 16,
      description:
        "Привіт, я Дарина. Знаю, як подорожувати яскраво та знаходити цікаві рішення. Ділюся практичними лайфхаками та маршрутами.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcffc",
      },
      name: "Поліна Романенко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffc.webp",
      articlesAmount: 0,
      description:
        "Мене звати Поліна. Я досліджую світ через мистецтво та естетику. Шукаю красу у деталях та ділюся натхненням з вами!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd00f",
      },
      name: "Дарина Іваненко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd00f.webp",
      articlesAmount: 0,
      description:
        "Я Дарина. Для мене подорож – це справжній релакс. Шукаю спокійні місця та ділюся історіями про сонце, тишу та гармонію.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd013",
      },
      name: "Поліна Романенко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd013.webp",
      articlesAmount: 0,
      description:
        "Це Поліна! Я живу пригодами! Екстрим, драйв та нові виклики – моє все. Ділюся адреналіном та найяскравішими емоціями.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd011",
      },
      name: "Богдан Коваль",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd011.webp",
      articlesAmount: 0,
      description:
        'Я Богдан. Прагну зануритись у культуру, а не просто "відвідати". Шукаю автентичність та розповідаю вам справжні історії.',
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd016",
      },
      name: "Анастасія Бойко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd016.webp",
      articlesAmount: 0,
      description:
        "Привіт, я Анастасія. Мій фотоапарат – вірний супутник. Ловлю моменти, кольори та світло. Це мої подорожі у яскравих кадрах.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd002",
      },
      name: "Олександра Ткаченко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd002.webp",
      articlesAmount: 0,
      description:
        'Я Олександра. Подорож як стиль життя. Мої історії про досвід "цифрового кочівника" та життя в різних куточках. Надихаю!',
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd014",
      },
      name: "Андрій Коваленко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd014.webp",
      articlesAmount: 0,
      description:
        "Я Андрій. Доводжу, що пригоди завжди поруч. Розповідаю про яскраві вікенди та цікаві місця. Не треба їхати далеко!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcff7",
      },
      name: "Олександр Шевчук",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff7.webp",
      articlesAmount: 0,
      description:
        "Привіт, я Олександр. Захоплююсь минулим. Мої статті – це подорожі крізь час, дослідження таємниць та величних місць.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcffa",
      },
      name: "Іван Ковальчук",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffa.webp",
      articlesAmount: 0,
      description:
        "Я Іван. Мій дім там, де пригоди. Мої історії про виклики, неймовірні краєвиди та величну силу природи. Світ завжди кличе!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd003",
      },
      name: "Дарина Лисенко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd003.webp",
      articlesAmount: 0,
      description:
        "Я Дарина. Подорожую свідомо. Мої історії про еко-туризм, волонтерство та як зробити наш світ кращим, мандруючи. Це важливо.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd006",
      },
      name: "Олександр Мельник",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd006.webp",
      articlesAmount: 0,
      description:
        "Я Олександр. Світ безмежний! Мої статті про те, як важливо виходити з зони комфорту та знаходити справжні дива у кожному дні.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd007",
      },
      name: "Єва Коваленко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd007.webp",
      articlesAmount: 0,
      description:
        "Я Єва. Обожнюю атмосферу нових місць. Розповідаю про затишні кав'ярні, унікальні локації та неймовірний місцевий вайб.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd00a",
      },
      name: "Андрій Романенко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd00a.webp",
      articlesAmount: 0,
      description:
        "Я Андрій. Дорога – це мій дім. Мої статті про епічні подорожі, відчуття свободи та музику в дорозі. Пригоди чекають!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd015",
      },
      name: "Максим Поліщук",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd015.webp",
      articlesAmount: 0,
      description:
        "Привіт, я Максим. Мене вабить екзотика. Мої статті про незвідані куточки планети та дивовижні культури. Світ прекрасний!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcff9",
      },
      name: "Владислав Поліщук",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff9.webp",
      articlesAmount: 0,
      description:
        "Я Влад. Поєдную спорт та мандри. Розповідаю про біг, активний відпочинок та нові виклики у нових місцях. Рух – це життя!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcfff",
      },
      name: "Дарина Шевченко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcfff.webp",
      articlesAmount: 0,
      description:
        "Я Дарина. Люблю жити як місцеві. Мої статті про те, як зануритись у культуру, а не бути туристом. Це справжні емоції.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd012",
      },
      name: "Матвій Мельник",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd012.webp",
      articlesAmount: 0,
      description:
        "Я Матвій. Шукаю натхнення у кожній поїздці. Розповідаю про красу, дивовижних людей та відкриття. Світ надихає на великі справи!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd01a",
      },
      name: "Матвій Петренко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd01a.webp",
      articlesAmount: 0,
      description:
        "Я Матвій. Подорож – це пізнання себе. Мої історії про особисті відкриття, роздуми та красу, що змінює нас зсередини.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd004",
      },
      name: "Єва Шевченко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd004.webp",
      articlesAmount: 0,
      description:
        "Я Єва. Мандрую з родиною. Розповідаю про те, як зробити подорожі з дітьми комфортними, веселими та незабутніми.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd00b",
      },
      name: "Дмитро Ткачук",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd00b.webp",
      articlesAmount: 0,
      description:
        "Я Дмитро. Досліджую місця з незвичного ракурсу. Мої історії про урбаністику, ритм життя та інший бік знайомих локацій.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd019",
      },
      name: "Анна Іваненко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd019.webp",
      articlesAmount: 0,
      description:
        "Привіт, я Анна. Подорожую світом сама. Розповідаю про безпеку, натхнення та переваги чудових соло-мандрівок для дівчат.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcffe",
      },
      name: "Владислав Гриценко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffe.webp",
      articlesAmount: 0,
      description:
        "Я Владислав. Йду туди, де немає натовпів туристів. Мої історії про приховані місця, автентичний досвід та справжні пригоди.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd005",
      },
      name: "Катерина Іваненко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd005.webp",
      articlesAmount: 0,
      description:
        "Я Катерина. Люблю затишні подорожі. Розповідаю про гарні місця, спа, та як поєднати відкриття з максимальним комфортом.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd008",
      },
      name: "Максим Іваненко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd008.webp",
      articlesAmount: 0,
      description:
        "Я Максим. Мандрую з гаджетами. Розповідаю про корисні додатки, техніку для подорожей та як технології роблять мандри кращими.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd018",
      },
      name: "Поліна Поліщук",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd018.webp",
      articlesAmount: 0,
      description:
        "Я Поліна. Подорож – моя муза. Розповідаю про те, як мандри надихають на творчість, малювання та народження нових ідей.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcff4",
      },
      name: "Єва Бондаренко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff4.webp",
      articlesAmount: 0,
      description:
        "Привіт, я Єва. Роблю перші кроки у великий світ. Мої статті про те, як почати подорожувати та не боятися невідомого.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcff6",
      },
      name: "Олександра Бондаренко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff6.webp",
      articlesAmount: 0,
      description:
        "Я Олександра. Закохана у дику природу. Мої статті про неймовірні пейзажі, світанки та красу, яку треба берегти.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd001",
      },
      name: "Максим Гриценко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd001.webp",
      articlesAmount: 0,
      description:
        "Я Максим. Кидаю собі виклик у кожній поїздці. Мої історії про пригоди, витривалість та те, як мандри загартовують дух.",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcff3",
      },
      name: "Назар Ткаченко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff3.webp",
      articlesAmount: 0,
      description:
        "Я Назар. Аналізую простір. Мої статті про урбаністику, транспорт та те, чим живуть та дихають великі локації. Це цікаво!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd00c",
      },
      name: "Злата Олійник",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd00c.webp",
      articlesAmount: 0,
      description:
        "Я Злата. Смак подорожі – у деталях. Розповідаю про місцеві ринки, вуличну їжу та гастрономічні секрети. Смакуйте світ!",
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd00d",
      },
      name: "Олександр Поліщук",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd00d.webp",
      articlesAmount: 0,
      description:
        "Я Олександр. Моя стихія – пригоди. Мої статті про активний відпочинок, драйв та життя біля води. Глибина та свобода надихають.",
    },
  ];
  return (
    // <main>
    <>
      <Hero />
      <About />
      <OurTravellers
        travelers={travelers.map((t) => ({
          id: t._id.$oid,
          name: t.name,
          avatarUrl: t.avatarUrl,
          description: t.description,
        }))}
      />
      <Join />
    </>
    // </main>
  );
}
