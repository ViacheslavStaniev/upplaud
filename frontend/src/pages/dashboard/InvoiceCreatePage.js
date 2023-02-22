import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import InvoiceNewEditForm from '../../sections/@dashboard/invoice/form';
import AppTitle from '../../components/AppTitle';

export default function InvoiceCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <AppTitle title="Invoices: Create a new invoice" />

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new invoice"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.list,
            },
            {
              name: 'New invoice',
            },
          ]}
        />

        <InvoiceNewEditForm />
      </Container>
    </>
  );
}
