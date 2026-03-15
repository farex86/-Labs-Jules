export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);

  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];

        if (value === null || value === undefined) return '';

        const stringValue = typeof value === 'object'
          ? JSON.stringify(value).replace(/"/g, '""')
          : String(value).replace(/"/g, '""');

        return stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')
          ? `"${stringValue}"`
          : stringValue;
      }).join(',')
    ),
  ];

  const csv = csvRows.join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export const flattenObject = (obj, prefix = '') => {
  const flattened = {};

  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      flattened[prefix + key] = '';
    } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      Object.assign(flattened, flattenObject(obj[key], `${prefix}${key}_`));
    } else if (Array.isArray(obj[key])) {
      flattened[prefix + key] = obj[key].join('; ');
    } else {
      flattened[prefix + key] = obj[key];
    }
  }

  return flattened;
};

export const exportTransactionsToCSV = (transactions) => {
  const flattenedData = transactions.map(transaction => {
    const flat = {
      id: transaction.id,
      amount: transaction.amount,
      status: transaction.status,
      location: transaction.location,
      created_at: new Date(transaction.created_at).toLocaleString(),
      voucher_code: transaction.vouchers?.voucher_code || '',
      program_name: transaction.vouchers?.voucher_programs?.name || '',
      beneficiary_name: transaction.vouchers?.beneficiaries?.full_name || '',
      beneficiary_id: transaction.vouchers?.beneficiaries?.beneficiary_id || '',
      vendor_name: transaction.vendors?.business_name || '',
    };
    return flat;
  });

  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(flattenedData, `transactions-${timestamp}.csv`);
};

export const exportVouchersToCSV = (vouchers) => {
  const flattenedData = vouchers.map(voucher => ({
    id: voucher.id,
    voucher_code: voucher.voucher_code,
    status: voucher.status,
    amount: voucher.amount,
    remaining_amount: voucher.remaining_amount,
    expiration_date: new Date(voucher.expiration_date).toLocaleDateString(),
    program_name: voucher.voucher_programs?.name || '',
    beneficiary_name: voucher.beneficiaries?.full_name || '',
    beneficiary_id: voucher.beneficiaries?.beneficiary_id || '',
    created_at: new Date(voucher.created_at).toLocaleString(),
  }));

  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(flattenedData, `vouchers-${timestamp}.csv`);
};

export const exportBeneficiariesToCSV = (beneficiaries) => {
  const flattenedData = beneficiaries.map(beneficiary => ({
    id: beneficiary.id,
    beneficiary_id: beneficiary.beneficiary_id,
    full_name: beneficiary.full_name,
    phone: beneficiary.phone,
    location: beneficiary.location,
    status: beneficiary.status,
    created_at: new Date(beneficiary.created_at).toLocaleString(),
  }));

  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(flattenedData, `beneficiaries-${timestamp}.csv`);
};

export const exportVendorsToCSV = (vendors) => {
  const flattenedData = vendors.map(vendor => ({
    id: vendor.id,
    vendor_id: vendor.vendor_id,
    business_name: vendor.business_name,
    contact_name: vendor.contact_name,
    phone: vendor.phone,
    location: vendor.location,
    status: vendor.status,
    created_at: new Date(vendor.created_at).toLocaleString(),
  }));

  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(flattenedData, `vendors-${timestamp}.csv`);
};
