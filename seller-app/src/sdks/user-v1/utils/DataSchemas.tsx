import { PaginationOption } from "../../GlobalDataSchemas"
import { File } from "../../image-v1/utils/DataSchemas"

export interface UserAddress {
  phone: string
  city: string
  fullLocation: string
  zipCode: string
}

export interface UserProfile {
  _id?: string
  imageId?: string
  firstName?: string
  lastName?: string
  fullName?: string
  email?: string
  address?: UserAddress
  gender?: string
  role?: string
}

export interface FullUserProfile {
  _id: string
  imageId: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  address: UserAddress
  gender: string
  role: string
  wishListIds: Array<string>
  blogListIds: Array<string>
  viewedListIds: Array<string>
  deleted: boolean
  suspended: boolean
  createdBy: string
  updatedBy: string
  createdUser: any
  updatedUser: any
  image: File
  wishList:  Array<any>
  blogList:  Array<any>
  viewedList:  Array<any>
}

export interface CreateRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  gender: string
  imageId: string | null
  address: UserAddress
  deleted: boolean
  suspended: boolean
  newsletterSubscribed: boolean
}

export interface ChangePassword {
  oldPassword: string
  newPassword: string
}

export interface PaginationOptionUser extends PaginationOption{
  published_only?: string
  role?: string
}

export enum USER_ROLES {
  user = 'user',
  master = 'master',
  manager = 'manager',
  delivery = 'delivery',
  moderator = 'moderator'
}

export const AdminRoles : Array<any> = [
  {name : USER_ROLES.manager, value: USER_ROLES.manager},
  {name : USER_ROLES.master, value: USER_ROLES.master},
  {name : USER_ROLES.delivery, value: USER_ROLES.delivery},
  {name : USER_ROLES.moderator, value: USER_ROLES.moderator}
]

export const MorroccoCities : Array<any> = [
  {
      name: "Abadou",
      value: "Abadou",
  },
  {
      name: "Adassil",
      value: "Adassil",
  },
  {
      name: "Agadir",
      value: "Agadir",
  },
  {
      name: "Agadir Melloul",
      value: "Agadir Melloul",
  },
  {
      name: "Agadir-Ida-ou-Tnan",
      value: "Agadir-Ida-ou-Tnan",
  },
  {
      name: "Agdz",
      value: "Agdz",
  },
  {
      name: "Aguelmous",
      value: "Aguelmous",
  },
  {
      name: "Ahfir",
      value: "Ahfir",
  },
  {
      name: "Aïn Beni Mathar",
      value: "Aïn Beni Mathar",
  },
  {
      name: "Aïn Leuh",
      value: "Aïn Leuh",
  },
  {
      name: "Akhfennir",
      value: "Akhfennir",
  },
  {
      name: "Aknoul",
      value: "Aknoul",
  },
  {
      name: "Al Aaroui",
      value: "Al Aaroui",
  },
  {
      name: "Al Fqih Ben Çalah",
      value: "Al Fqih Ben Çalah",
  },
  {
      name: "Al Hoceïma",
      value: "Al Hoceïma",
  },
  {
      name: "Al-Haouz",
      value: "Al-Haouz",
  },
  {
      name: "Al-Hoceima",
      value: "Al-Hoceima",
  },
  {
      name: "Almis Marmoucha",
      value: "Almis Marmoucha",
  },
  {
      name: "Alnif",
      value: "Alnif",
  },
  {
      name: "Aoufous",
      value: "Aoufous",
  },
  {
      name: "Aoulouz",
      value: "Aoulouz",
  },
  {
      name: "Aourir",
      value: "Aourir",
  },
  {
      name: "Aousserd",
      value: "Aousserd",
  },
  {
      name: "Arazane",
      value: "Arazane",
  },
  {
      name: "Arbaoua",
      value: "Arbaoua",
  },
  {
      name: "Arfoud",
      value: "Arfoud",
  },
  {
      name: "Argana",
      value: "Argana",
  },
  {
      name: "Asilah",
      value: "Asilah",
  },
  {
      name: "Assa-Zag",
      value: "Assa-Zag",
  },
  {
      name: "Azemmour",
      value: "Azemmour",
  },
  {
      name: "Azilal",
      value: "Azilal",
  },
  {
      name: "Azilal Province",
      value: "Azilal Province",
  },
  {
      name: "Azrou",
      value: "Azrou",
  },
  {
      name: "Beni Mellal",
      value: "Beni Mellal",
  },
  {
      name: "Beni-Mellal",
      value: "Beni-Mellal",
  },
  {
      name: "Benslimane",
      value: "Benslimane",
  },
  {
      name: "Berkane",
      value: "Berkane",
  },
  {
      name: "Berrechid",
      value: "Berrechid",
  },
  {
      name: "Berrechid Province",
      value: "Berrechid Province",
  },
  {
      name: "Bhalil",
      value: "Bhalil",
  },
  {
      name: "Bigoudine",
      value: "Bigoudine",
  },
  {
      name: "Bni Bouayach",
      value: "Bni Bouayach",
  },
  {
      name: "Bouabout",
      value: "Bouabout",
  },
  {
      name: "Bouarfa",
      value: "Bouarfa",
  },
  {
      name: "Bouarouss",
      value: "Bouarouss",
  },
  {
      name: "Boujdour",
      value: "Boujdour",
  },
  {
      name: "Boujniba",
      value: "Boujniba",
  },
  {
      name: "Boulaouane",
      value: "Boulaouane",
  },
  {
      name: "Boulemane",
      value: "Boulemane",
  },
  {
      name: "Bouskoura",
      value: "Bouskoura",
  },
  {
      name: "Bouznika",
      value: "Bouznika",
  },
  {
      name: "Brikcha",
      value: "Brikcha",
  },
  {
      name: "Bzou",
      value: "Bzou",
  },
  {
      name: "Cap Negro II",
      value: "Cap Negro II",
  },
  {
      name: "Casablanca",
      value: "Casablanca",
  },
  {
      name: "Chefchaouen Province",
      value: "Chefchaouen Province",
  },
  {
      name: "Chefchaouene",
      value: "Chefchaouene",
  },
  {
      name: "Chichaoua",
      value: "Chichaoua",
  },
  {
      name: "Chtouka-Ait-Baha",
      value: "Chtouka-Ait-Baha",
  },
  {
      name: "Dar Ould Zidouh",
      value: "Dar Ould Zidouh",
  },
  {
      name: "Debdou",
      value: "Debdou",
  },
  {
      name: "Demnate",
      value: "Demnate",
  },
  {
      name: "Derdara",
      value: "Derdara",
  },
  {
      name: "Driouch Province",
      value: "Driouch Province",
  },
  {
      name: "El Aïoun",
      value: "El Aïoun",
  },
  {
      name: "El Hajeb",
      value: "El Hajeb",
  },
  {
      name: "El Jadid",
      value: "El Jadid",
  },
  {
      name: "El Ksiba",
      value: "El Ksiba",
  },
  {
      name: "El-Hajeb",
      value: "El-Hajeb",
  },
  {
      name: "El-Jadida",
      value: "El-Jadida",
  },
  {
      name: "Errachidia",
      value: "Errachidia",
  },
  {
      name: "Es-Semara",
      value: "Es-Semara",
  },
  {
      name: "Essaouira",
      value: "Essaouira",
  },
  {
      name: "Fahs-Anjra",
      value: "Fahs-Anjra",
  },
  {
      name: "Fes",
      value: "Fes",
  },
  {
      name: "Fès al Bali",
      value: "Fès al Bali",
  },
  {
      name: "Figuig",
      value: "Figuig",
  },
  {
      name: "Fnidek",
      value: "Fnidek",
  },
  {
      name: "Fquih Ben Salah Province",
      value: "Fquih Ben Salah Province",
  },
  {
      name: "Galaz",
      value: "Galaz",
  },
  {
      name: "Ghouazi",
      value: "Ghouazi",
  },
  {
      name: "Guelmim",
      value: "Guelmim",
  },
  {
      name: "Gueltat Zemmour",
      value: "Gueltat Zemmour",
  },
  {
      name: "Guercif",
      value: "Guercif",
  },
  {
      name: "Guercif Province",
      value: "Guercif Province",
  },
  {
      name: "Had Kourt",
      value: "Had Kourt",
  },
  {
      name: "Ifrane",
      value: "Ifrane",
  },
  {
      name: "Ifrane",
      value: "Ifrane",
  },
  {
      name: "Imilchil",
      value: "Imilchil",
  },
  {
      name: "Imlili",
      value: "Imlili",
  },
  {
      name: "Imzouren",
      value: "Imzouren",
  },
  {
      name: "Inezgane",
      value: "Inezgane",
  },
  {
      name: "Inezgane-Ait Melloul",
      value: "Inezgane-Ait Melloul",
  },
  {
      name: "Isseksi",
      value: "Isseksi",
  },
  {
      name: "Itzer",
      value: "Itzer",
  },
  {
      name: "Jebel Tiskaouine",
      value: "Jebel Tiskaouine",
  },
  {
      name: "Jerada",
      value: "Jerada",
  },
  {
      name: "Jorf",
      value: "Jorf",
  },
  {
      name: "Kasba Tadla",
      value: "Kasba Tadla",
  },
  {
      name: "Kelaa-Des-Sraghna",
      value: "Kelaa-Des-Sraghna",
  },
  {
      name: "Kelaat Mgouna",
      value: "Kelaat Mgouna",
  },
  {
      name: "Kenitra",
      value: "Kenitra",
  },
  {
      name: "Kenitra Province",
      value: "Kenitra Province",
  },
  {
      name: "Kerrouchen",
      value: "Kerrouchen",
  },
  {
      name: "Khemisset",
      value: "Khemisset",
  },
  {
      name: "Khenifra",
      value: "Khenifra",
  },
  {
      name: "Khouribga",
      value: "Khouribga",
  },
  {
      name: "Khouribga Province",
      value: "Khouribga Province",
  },
  {
      name: "Ksar El Kebir",
      value: "Ksar El Kebir",
  },
  {
      name: "Laayoune",
      value: "Laayoune",
  },
  {
      name: "Larache",
      value: "Larache",
  },
  {
      name: "M'Diq-Fnideq",
      value: "M'Diq-Fnideq",
  },
  {
      name: "Madagh",
      value: "Madagh",
  },
  {
      name: "Marrakech",
      value: "Marrakech",
  },
  {
      name: "Marrakesh",
      value: "Marrakesh",
  },
  {
      name: "Martil",
      value: "Martil",
  },
  {
      name: "Mechraa Bel Ksiri",
      value: "Mechraa Bel Ksiri",
  },
  {
      name: "Mediouna",
      value: "Mediouna",
  },
  {
      name: "Meknes",
      value: "Meknes",
  },
  {
      name: "Mhamid",
      value: "Mhamid",
  },
  {
      name: "Midar",
      value: "Midar",
  },
  {
      name: "Midelt",
      value: "Midelt",
  },
  {
      name: "Midelt",
      value: "Midelt",
  },
  {
      name: "Missour",
      value: "Missour",
  },
  {
      name: "Mohammedia",
      value: "Mohammedia",
  },
  {
      name: "Moulay Bouchta",
      value: "Moulay Bouchta",
  },
  {
      name: "Moulay-Yacoub",
      value: "Moulay-Yacoub",
  },
  {
      name: "Nador",
      value: "Nador",
  },
  {
      name: "Nouaceur",
      value: "Nouaceur",
  },
  {
      name: "Oualidia",
      value: "Oualidia",
  },
  {
      name: "Ouaoula",
      value: "Ouaoula",
  },
  {
      name: "Ouarzazat",
      value: "Ouarzazat",
  },
  {
      name: "Ouarzazate",
      value: "Ouarzazate",
  },
  {
      name: "Oued Amlil",
      value: "Oued Amlil",
  },
  {
      name: "Oued Laou",
      value: "Oued Laou",
  },
  {
      name: "Oued Zem",
      value: "Oued Zem",
  },
  {
      name: "Oued-Ed-Dahab",
      value: "Oued-Ed-Dahab",
  },
  {
      name: "Ouezzane",
      value: "Ouezzane",
  },
  {
      name: "Ouezzane Province",
      value: "Ouezzane Province",
  },
  {
      name: "Ouijjane",
      value: "Ouijjane",
  },
  {
      name: "Oujda-Angad",
      value: "Oujda-Angad",
  },
  {
      name: "Oukaïmedene",
      value: "Oukaïmedene",
  },
  {
      name: "Oulad Frej",
      value: "Oulad Frej",
  },
  {
      name: "Oulad Tayeb",
      value: "Oulad Tayeb",
  },
  {
      name: "Oulad Teïma",
      value: "Oulad Teïma",
  },
  {
      name: "Oulmes",
      value: "Oulmes",
  },
  {
      name: "Ourtzagh",
      value: "Ourtzagh",
  },
  {
      name: "Rabat",
      value: "Rabat",
  },
  {
      name: "Reçani",
      value: "Reçani",
  },
  {
      name: "Reggada",
      value: "Reggada",
  },
  {
      name: "Rehamna",
      value: "Rehamna",
  },
  {
      name: "Safi",
      value: "Safi",
  },
  {
      name: "Saidia",
      value: "Saidia",
  },
  {
      name: "Sale",
      value: "Sale",
  },
  {
      name: "Sefrou",
      value: "Sefrou",
  },
  {
      name: "Selouane",
      value: "Selouane",
  },
  {
      name: "Senada",
      value: "Senada",
  },
  {
      name: "Settat",
      value: "Settat",
  },
  {
      name: "Settat Province",
      value: "Settat Province",
  },
  {
      name: "Setti Fatma",
      value: "Setti Fatma",
  },
  {
      name: "Sidi Bennour",
      value: "Sidi Bennour",
  },
  {
      name: "Sidi Bousber",
      value: "Sidi Bousber",
  },
  {
      name: "Sidi Ifni",
      value: "Sidi Ifni",
  },
  {
      name: "Sidi Ifni",
      value: "Sidi Ifni",
  },
  {
      name: "Sidi Jaber",
      value: "Sidi Jaber",
  },
  {
      name: "Sidi Qacem",
      value: "Sidi Qacem",
  },
  {
      name: "Sidi Rahhal",
      value: "Sidi Rahhal",
  },
  {
      name: "Sidi Redouane",
      value: "Sidi Redouane",
  },
  {
      name: "Sidi Slimane",
      value: "Sidi Slimane",
  },
  {
      name: "Sidi Smai’il",
      value: "Sidi Smai’il",
  },
  {
      name: "Sidi Yahia El Gharb",
      value: "Sidi Yahia El Gharb",
  },
  {
      name: "Sidi-Kacem",
      value: "Sidi-Kacem",
  },
  {
      name: "Skhirate",
      value: "Skhirate",
  },
  {
      name: "Skhirate-Temara",
      value: "Skhirate-Temara",
  },
  {
      name: "Smara",
      value: "Smara",
  },
  {
      name: "Smimou",
      value: "Smimou",
  },
  {
      name: "Souq Larb’a al Gharb",
      value: "Souq Larb’a al Gharb",
  },
  {
      name: "Tadrart",
      value: "Tadrart",
  },
  {
      name: "Tafraout",
      value: "Tafraout",
  },
  {
      name: "Taghazout",
      value: "Taghazout",
  },
  {
      name: "Tahla",
      value: "Tahla",
  },
  {
      name: "Taliouine",
      value: "Taliouine",
  },
  {
      name: "Talzemt",
      value: "Talzemt",
  },
  {
      name: "Tamanar",
      value: "Tamanar",
  },
  {
      name: "Tamorot",
      value: "Tamorot",
  },
  {
      name: "Tamri",
      value: "Tamri",
  },
  {
      name: "Tan-Tan",
      value: "Tan-Tan",
  },
  {
      name: "Tanalt",
      value: "Tanalt",
  },
  {
      name: "Tanger-Assilah",
      value: "Tanger-Assilah",
  },
  {
      name: "Tangier",
      value: "Tangier",
  },
  {
      name: "Taouloukoult",
      value: "Taouloukoult",
  },
  {
      name: "Taounate",
      value: "Taounate",
  },
  {
      name: "Taourirt",
      value: "Taourirt",
  },
  {
      name: "Tarfaya",
      value: "Tarfaya",
  },
  {
      name: "Targuist",
      value: "Targuist",
  },
  {
      name: "Taroudannt",
      value: "Taroudannt",
  },
  {
      name: "Taroudant",
      value: "Taroudant",
  },
  {
      name: "Tarsouat",
      value: "Tarsouat",
  },
  {
      name: "Tata",
      value: "Tata",
  },
  {
      name: "Taza",
      value: "Taza",
  },
  {
      name: "Taznakht",
      value: "Taznakht",
  },
  {
      name: "Telouet",
      value: "Telouet",
  },
  {
      name: "Temara",
      value: "Temara",
  },
  {
      name: "Teroual",
      value: "Teroual",
  },
  {
      name: "Tetouan",
      value: "Tetouan",
  },
  {
      name: "Tidili Mesfioua",
      value: "Tidili Mesfioua",
  },
  {
      name: "Tiflet",
      value: "Tiflet",
  },
  {
      name: "Timezgadiouine",
      value: "Timezgadiouine",
  },
  {
      name: "Timoulilt",
      value: "Timoulilt",
  },
  {
      name: "Tinghir",
      value: "Tinghir",
  },
  {
      name: "Tinghir Province",
      value: "Tinghir Province",
  },
  {
      name: "Tirhanimîne",
      value: "Tirhanimîne",
  },
  {
      name: "Tit Mellil",
      value: "Tit Mellil",
  },
  {
      name: "Tiznit",
      value: "Tiznit",
  },
  {
      name: "Tiztoutine",
      value: "Tiztoutine",
  },
  {
      name: "Tmourghout",
      value: "Tmourghout",
  },
  {
      name: "Youssoufia",
      value: "Youssoufia",
  },
  {
      name: "Zagora",
      value: "Zagora",
  },
  {
      name: "Zaïo",
      value: "Zaïo",
  },
  {
      name: "Zawyat an Nwaçer",
      value: "Zawyat an Nwaçer",
  },
  {
      name: "Zawyat ech Cheïkh",
      value: "Zawyat ech Cheïkh",
  },
  {
      name: "Zerkten",
      value: "Zerkten",
  },
  {
      name: "Zinat",
      value: "Zinat",
  },
  {
      name: "Zoumi",
      value: "Zoumi",
  }
]