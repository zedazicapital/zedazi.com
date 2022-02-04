interface Site {
  title: string
  subtitle?: string
  lang?: string
  descr?: string
  author: {
    name: string
    avatar: string
    status?: string
    bio?: string
    bioBefore?: string
    bioAfter?: string
    github?: string
    twitter?: string
    identica?: string
    pgp?: string[]
  }
  url: string
  themeColor?: string
  since?: string
}

export const site: Site = {
  title: 'Zedazi Capital',
  subtitle: 'Investing in Open future',
  lang: 'en-US',
  descr: '',
  author: {
    name: 'Zedazi Capital',
    avatar: '/assets/maskable@512.png',
    status: '🌸',
    bio: 'Investments of tomorrow.'
  },
  url: (import.meta.env.URARA_SITE_URL as string) ?? 'https://zedazi.com',
  themeColor: '#3D4451'
}
