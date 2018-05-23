export interface MenuItemInterfase {
  name: string;
  link: string;
}

export const menu: Array<MenuItemInterfase> = [
  {
    name: 'System health',
    link: '/systemhealth'
  },
  {
    name: 'Settings',
    link: '/settings'
  }
]
