import React from 'react';
import { Edit2, Trash2 } from 'lucide-react'; // Assuming these might be used later for edit/delete

const Members = ({ members, rounds }) => {
  // Helper to calculate average score, can be moved to App.js or utils later
  const calculateAverageScore = (memberId) => {
    const memberRounds = rounds.filter(r => r.memberId === memberId && r.status === 'completed' && r.score);
    if (memberRounds.length === 0) return 'N/A';
    const totalScore = memberRounds.reduce((sum, r) => sum + r.score, 0);
    return (totalScore / memberRounds.length).toFixed(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Club Members</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Handicap</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rounds Played</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg. Score</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map(member => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{member.name}</td>
                <td className="px-6 py-4">{member.email}</td>
                <td className="px-6 py-4">{member.handicap}</td>
                <td className="px-6 py-4">{member.rounds}</td>
                <td className="px-6 py-4">{calculateAverageScore(member.id)}</td>
                {/* <td className="px-6 py-4 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800"><Edit2 size={18} /></button>
                  <button className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
