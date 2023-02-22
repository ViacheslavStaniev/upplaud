import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import { _invoices } from '../../_mock/arrays';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import InvoiceNewEditForm from '../../sections/@dashboard/invoice/form';
import AppTitle from '../../components/AppTitle';

export default function InvoiceEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <>
      <AppTitle title="Invoice: Edit" />

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit invoice"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.list,
            },
            { name: `INV-${currentInvoice?.invoiceNumber}` },
          ]}
        />

        <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
      </Container>
    </>
  );
}
