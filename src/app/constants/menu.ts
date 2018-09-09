import { baseDomain, protocol, host } from 'app/lib/agent'

export interface MenuItemInterfase {
  id?: string;
  name: string;
  link: string;
  extenal?: boolean;
}

const baseUrl = `${protocol}//${host}`

export const menu: Array<MenuItemInterfase> = [
  {
    name: 'Dashboard',
    link: `/`
  },
  {
    id: 'logs',
    name: 'Logs',
    link: `/logs`
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
    link: `${protocol}//grafana.${baseDomain}`,
    extenal: true
  },
  {
    name: 'Netdata',
    link: `${protocol}//netdata.${baseDomain}`,
    extenal: true
  },
]

