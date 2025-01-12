interface MpesaPayment {
  phoneNumber: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}

export async function initiateMpesaPayment(payment: MpesaPayment) {
  try {
    const response = await fetch('/api/payments/mpesa/stk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Mpesa payment error:', error);
    throw error;
  }
} 