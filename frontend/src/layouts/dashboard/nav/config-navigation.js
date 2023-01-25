import { ROUTES } from '../../../routes/paths';
import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: icon('user'),
  plus: icon('plus'),
  menu: icon('menu'),
  edit: icon('edit'),
  mail: icon('mail'),
  userAdmin: icon('user-admin'),
};

const navConfig = [
  {
    subheader: 'MANAGE',
    items: [
      { title: 'Account Admin', path: ROUTES.accountAdmin, icon: ICONS.user },
      { title: 'Add Guest', path: ROUTES.addGuest, icon: ICONS.plus },
      { title: 'Automations', path: ROUTES.automations, icon: ICONS.menu },
      { title: 'Posting Template', path: ROUTES.postingTemplate, icon: ICONS.edit },
      { title: 'Email Template', path: ROUTES.emailTemplate, icon: ICONS.mail },
      { title: 'Guesting Admin', path: ROUTES.guestingAdmin, icon: ICONS.userAdmin },
    ],
  },
];

export default navConfig;
