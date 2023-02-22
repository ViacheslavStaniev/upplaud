import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import { _invoices } from '../../_mock/arrays';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import InvoiceDetails from '../../sections/@dashboard/invoice/details';
import AppTitle from '../../components/AppTitle';

export default function InvoiceDetailsPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <>
      <AppTitle title="Invoice: View" />

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: `INV-${currentInvoice?.invoiceNumber}` },
          ]}
        />

        <InvoiceDetails invoice={currentInvoice} />
      </Container>
    </>
  );
}
