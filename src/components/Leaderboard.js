import React from 'react';
import { Trophy, MapPin, Star } from 'lucide-react';

const Leaderboard = ({ members, courses, rounds }) => {
  // Sort members by handicap for leaderboard
  const sortedMembers = [...members].sort((a, b) => a.handicap - b.handicap);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Trophy className="text-yellow-600" size={22} />
          <span>Handicap Leaderboard</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Handicap</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rounds Played</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedMembers.map((member, index) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{index + 1}</td>
                  <td className="px-4 py-3">{member.name}</td>
                  <td className="px-4 py-3">{member.handicap.toFixed(1)}</td>
                  <td className="px-4 py-3">{member.rounds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <MapPin className="text-green-600" size={22} />
          <span>Available Courses</span>
        </h2>
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800">{course.name}</h3>
              <p className="text-sm text-gray-600">{course.location}</p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>Par: {course.par}</span>
                <span>Rating: {course.rating}</span>
                <span>Slope: {course.slope}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
