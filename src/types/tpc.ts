
export interface TpcTask {
  id: string;
  productType: string;
  productName: string;
  action: 'Buy' | 'Sell';
  quantity: number;
  requestedSubmitted: string;
  status: 'pending' | 'approved' | 'rejected';
  suggestion: 'approval' | 'decline';
  suggestionReason: string;
}
