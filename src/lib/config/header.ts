interface headerConfig {
  nav?: { [href: string]: string }
  html?: string
}

export const config: headerConfig = {
  nav: {
    '/about': 'About',
    '/staking': 'Staking'
  }
}
