import { supabase } from '../lib/supabase';

export const fetchDashboardData = async () => {
  const [beneficiariesResult, vendorsResult, vouchersResult, transactionsResult] = await Promise.all([
    supabase.from('beneficiaries').select('id', { count: 'exact', head: true }),
    supabase.from('vendors').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('vouchers').select('id, status', { count: 'exact' }),
    supabase.from('transactions')
      .select(`
        id,
        amount,
        status,
        created_at,
        beneficiary_id,
        vendor_id,
        beneficiaries (
          profiles (
            full_name
          ),
          national_id
        ),
        vendors (
          business_name
        ),
        vouchers (
          code
        )
      `)
      .order('created_at', { ascending: false })
      .limit(5)
  ]);

  const vouchersIssued = vouchersResult.count || 0;
  const vouchersRedeemed = vouchersResult.data?.filter(v => v.status === 'used').length || 0;
  const redemptionRate = vouchersIssued > 0 ? ((vouchersRedeemed / vouchersIssued) * 100).toFixed(1) : 0;

  const stats = {
    totalBeneficiaries: beneficiariesResult.count || 0,
    activeVendors: vendorsResult.count || 0,
    vouchersIssued,
    vouchersRedeemed,
    redemptionRate,
  };

  const recentTransactions = transactionsResult.data || [];

  const { data: programData } = await supabase
    .from('voucher_programs')
    .select('name, vouchers(count)');

  const programDistribution = (programData || []).map(p => ({
    label: p.name,
    value: p.vouchers?.[0]?.count || 0
  }));

  const { data: vouchersByStatus } = await supabase
    .from('vouchers')
    .select('status');

  const statusCounts = (vouchersByStatus || []).reduce((acc, v) => {
    acc[v.status] = (acc[v.status] || 0) + 1;
    return acc;
  }, {});

  const statusDistribution = Object.entries(statusCounts).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value
  }));

  const chartData = {
    programDistribution,
    statusDistribution,
    monthlyTransactions: []
  };

  return { stats, recentTransactions, chartData };
};

export default { fetchDashboardData };
