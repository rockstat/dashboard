import { baseDomain, protocol, host } from 'app/lib/agent'

export interface MenuItemInterfase {
  id?: string;
  name: string;
  link: string;
  extenal?: boolean;
}

export const menuItems: Array<MenuItemInterfase> = [
  {
    name: 'Dashboard',
    link: `/`
  },
  {
    name: 'Logs',
    link: `/logs`
  },
  {
    name: 'Theia IDE',
    link: `${protocol}//theia.${baseDomain}`
  },
  {
    name: 'Jupyter',
    link: `${protocol}//jupyter.${baseDomain}`
  },
  {
    name: 'Grafana',
    link: `${protocol}//grafana.${baseDomain}`
  },
  {
    name: 'Netdata',
    link: `${protocol}//netdata.${baseDomain}`
  },
  {
    name: 'Demo',
    link: `${protocol}//demo.${baseDomain}?utm_source=rockstat-app`
  },
  {
    name: 'Documentation',
    link: `https://rock.st/docs?utm_source=rockstat-app`
  },
]

