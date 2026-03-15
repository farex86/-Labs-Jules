import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useRealtimeSubscription = (table, onUpdate) => {
  useEffect(() => {
    const channel = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
        },
        (payload) => {
          onUpdate(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, onUpdate]);
};

export const useRealtimeTransactions = (onUpdate) => {
  useRealtimeSubscription('transactions', onUpdate);
};

export const useRealtimeVouchers = (onUpdate) => {
  useRealtimeSubscription('vouchers', onUpdate);
};

export const useRealtimeBeneficiaries = (onUpdate) => {
  useRealtimeSubscription('beneficiaries', onUpdate);
};

export const useRealtimeVendors = (onUpdate) => {
  useRealtimeSubscription('vendors', onUpdate);
};
