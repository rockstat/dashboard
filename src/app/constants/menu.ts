export interface MenuItemInterfase {
  name: string;
  link: string;
}

export const menu: Array<MenuItemInterfase> = [
  {
    name: 'Dashboard',
    link: '/'
  },
  {
    name: 'service Store',
    link: '/service_store'
  },
  {
    name: 'Data Hub',
    link: '/data_hub'
  },
  {
    name: 'Settings',
    link: '/settings'
  }
]

