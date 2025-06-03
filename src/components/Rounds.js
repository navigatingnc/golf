import React from 'react';
import { Plus } from 'lucide-react';

const Rounds = ({ members, courses, rounds, newRound, setNewRound, addRound, getMemberName, getCourseName, startScorecard }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Schedule New Round</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <select
            value={newRound.memberId}
            onChange={(e) => setNewRound({...newRound, memberId: e.target.value})}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="">Select Member</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>

          <select
            value={newRound.courseId}
            onChange={(e) => setNewRound({...newRound, courseId: e.target.value})}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>

          <input
            type="date"
            value={newRound.date}
            onChange={(e) => setNewRound({...newRound, date: e.target.value})}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <input
            type="time"
            value={newRound.time}
            onChange={(e) => setNewRound({...newRound, time: e.target.value})}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <input
            type="number"
            placeholder="Score (if completed)"
            value={newRound.score}
            onChange={(e) => setNewRound({...newRound, score: e.target.value})}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <button
            onClick={addRound}
            className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
          >
            <Plus size={18} />
            <span>Add Round</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">All Rounds</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rounds.map(round => (
                <tr key={round.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{getMemberName(round.memberId)}</td>
                  <td className="px-6 py-4">{getCourseName(round.courseId)}</td>
                  <td className="px-6 py-4">{round.date}</td>
                  <td className="px-6 py-4">{round.time || '-'}</td>
                  <td className="px-6 py-4">
                    {round.score ? (
                      <span className="font-semibold">{round.score}</span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      round.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {round.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {round.status === 'scheduled' && (
                      <button
                        onClick={() => startScorecard(round.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        Start
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rounds;
