
import { TpcTask } from '@/pages/InternalApproval';

export const mockTpcTasks: TpcTask[] = [
  {
    id: '1',
    productType: 'Equity',
    productName: 'AAPL',
    action: 'Buy',
    quantity: 100,
    requestedSubmitted: '2025-05-10',
    status: 'pending',
    suggestion: 'approval',
    suggestionReason: 'Strong technical indicators and positive market sentiment for Apple.'
  },
  {
    id: '2',
    productType: 'Bond',
    productName: 'US Treasury 10Y',
    action: 'Sell',
    quantity: 50,
    requestedSubmitted: '2025-05-09',
    status: 'pending',
    suggestion: 'decline',
    suggestionReason: 'Rising interest rate environment suggests holding bonds longer would be more advantageous.'
  },
  {
    id: '3',
    productType: 'ETF',
    productName: 'SPY',
    action: 'Buy',
    quantity: 25,
    requestedSubmitted: '2025-05-08',
    status: 'approved',
    suggestion: 'approval',
    suggestionReason: 'Aligns with current portfolio diversification strategy and market outlook.'
  },
  {
    id: '4',
    productType: 'Option',
    productName: 'TSLA Call $900',
    action: 'Sell',
    quantity: 10,
    requestedSubmitted: '2025-05-07',
    status: 'rejected',
    suggestion: 'decline',
    suggestionReason: 'High volatility and recent price action suggest increased risk for this position.'
  },
  {
    id: '5',
    productType: 'Future',
    productName: 'E-mini S&P 500',
    action: 'Buy',
    quantity: 5,
    requestedSubmitted: '2025-05-06',
    status: 'pending',
    suggestion: 'approval',
    suggestionReason: 'Matches current market momentum and aligns with strategic asset allocation targets.'
  },
  {
    id: '6',
    productType: 'Forex',
    productName: 'EUR/USD Currency Pair',
    action: 'Sell',
    quantity: 75,
    requestedSubmitted: '2025-05-05',
    status: 'pending',
    suggestion: 'approval',
    suggestionReason: 'Expected divergence in monetary policy between ECB and Federal Reserve suggests potential for USD strength.'
  },
];
