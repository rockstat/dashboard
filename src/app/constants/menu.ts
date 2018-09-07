import { baseDomain, protocol, host } from 'app/lib/agent'

export interface MenuItemInterfase {
  name: string;
  link: string;
  extenal?: boolean;
}

const baseUrl = `${protocol}//${host}`

export const menu: Array<MenuItemInterfase> = [
  {
    name: 'Dashboard',
    link: `${baseUrl}/`
  },
  {
    name: 'Logs',
    link: `${baseUrl}/logs`
  },
  {
    name: 'Theia IDE',
    link: `${protocol}//theia.${baseDomain}`,
    extenal: true
  },
  {
    name: 'Jupyter',
    link: `${protocol}//jupyter.${baseDomain}`,
    extenal: true
  },
  {
    name: 'Grafana',
    link: `${protocol}//jupyter.${baseDomain}`,
    extenal: true
  },
  {
    name: 'Netdata',
    link: `${protocol}//netdata.${baseDomain}`,
    extenal: true
  },
]

