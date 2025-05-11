
import React from 'react';
import ApprovalCard, { ApprovalItem } from './ApprovalCard';

interface ApprovalListProps {
  approvals: ApprovalItem[];
}

const ApprovalList = ({ approvals }: ApprovalListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {approvals.map((approval) => (
        <ApprovalCard key={approval.id} approval={approval} />
      ))}
    </div>
  );
};

export default ApprovalList;
