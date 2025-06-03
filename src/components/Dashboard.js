import React from 'react';
import { Users, Calendar, Trophy, Clock } from 'lucide-react';

const Dashboard = ({ members, rounds, getMemberName, getCourseName, startScorecard, upcomingRounds, recentRounds }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="text-blue-600" size={24} />
            <h3 className="text-lg font-semibold">Active Members</h3>
          </div>
          <div className="text-3xl font-bold text-blue-600">{members.length}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold">Scheduled Rounds</h3>
          </div>
          <div className="text-3xl font-bold text-green-600">
            {rounds.filter(r => r.status === 'scheduled').length}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="text-yellow-600" size={24} />
            <h3 className="text-lg font-semibold">Completed Rounds</h3>
          </div>
          <div className="text-3xl font-bold text-yellow-600">
            {rounds.filter(r => r.status === 'completed').length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Clock className="text-blue-600" size={20} />
            <span>Upcoming Rounds</span>
          </h3>
          <div className="space-y-3">
            {upcomingRounds.map(round => (
              <div key={round.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold">{getMemberName(round.memberId)}</div>
                  <div className="text-sm text-gray-600">{getCourseName(round.courseId)}</div>
                  <div className="text-sm text-gray-500">{round.date} at {round.time}</div>
                </div>
                <button
                  onClick={() => startScorecard(round.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Start Round
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Trophy className="text-green-600" size={20} />
            <span>Recent Rounds</span>
          </h3>
          <div className="space-y-3">
            {recentRounds.map(round => (
              <div key={round.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-semibold">{getMemberName(round.memberId)}</div>
                  <div className="text-sm text-gray-600">{getCourseName(round.courseId)}</div>
                  <div className="text-sm text-gray-500">{round.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{round.score}</div>
                  <div className="text-xs text-gray-500">
                    {round.score > round.par ? `+${round.score - round.par}` :
                     round.score < round.par ? `${round.score - round.par}` : 'E'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
