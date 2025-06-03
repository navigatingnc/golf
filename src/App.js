import React, { useState, useEffect } from 'react';
import { Calendar, Users, Trophy, Target } from 'lucide-react'; // Removed unused icons, Plus is in Rounds

// Import Components
import Dashboard from './components/Dashboard.js';
import Scorecard from './components/Scorecard.js';
import Members from './components/Members.js';
import Rounds from './components/Rounds.js';
import Leaderboard from './components/Leaderboard.js';

const GolfApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [members, setMembers] = useState([
    { id: 1, name: 'John Smith', email: 'john@email.com', handicap: 12.4, rounds: 24 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', handicap: 8.2, rounds: 18 },
    { id: 3, name: 'Mike Davis', email: 'mike@email.com', handicap: 15.7, rounds: 31 }
  ]);
  
  const [courses, setCourses] = useState([
    { id: 1, name: 'Pine Valley Golf Club', location: 'Charlotte, NC', par: 72, rating: 73.2, slope: 135 },
    { id: 2, name: 'Highland Creek Golf Club', location: 'Monroe, NC', par: 71, rating: 72.1, slope: 128 },
    { id: 3, name: 'Riverwood Golf Club', location: 'Matthews, NC', par: 72, rating: 71.8, slope: 132 },
    { id: 4, name: 'Charles T. Myers Golf Course', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 5, name: 'Dr. Charles L. Sifford GC', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 6, name: 'Sunset Hills Golf Course', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 7, name: 'The Divide Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 8, name: 'Birkdale Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 9, name: 'Larkhaven Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 10, name: 'Olde Sycamore Golf Plantation', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 11, name: 'Paradise Valley Par 3', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 12, name: 'Mooresville Golf Course', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 13, name: 'Charlotte National Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 14, name: 'Stonebridge Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 15, name: 'Skybrook Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 16, name: 'Rocky River Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 17, name: 'Emerald Lake Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 18, name: 'The Tradition Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 19, name: 'Crowders Mountain Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 20, name: 'Catawba Creek Golf Course', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 21, name: 'Lincoln Country Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 22, name: 'Monroe Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 23, name: 'White Plains Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 24, name: 'Springfield Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 25, name: 'Fort Mill Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 26, name: 'Carolina Lakes Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 27, name: 'Tega Cay Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 28, name: 'Waterford Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 29, name: 'Pinetuck Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 30, name: 'Pebble Creek Golf Course', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 31, name: 'Green Meadows Golf Course', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 32, name: 'Verdict Ridge Golf & Country Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 33, name: 'Warrior Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 34, name: 'Corbin Hills Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 35, name: 'Spring Lake Country Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 36, name: 'Oak Hills Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 37, name: 'Rock Barn Golf & Spa – Jackson Course', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 38, name: 'Eagle Chase Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 39, name: 'Olde Beau Resort & Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 40, name: 'Pine Needles Lodge & Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 41, name: 'Tobacco Road Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 42, name: 'Southern Pines Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 43, name: 'Thistle Golf Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 44, name: 'Crystal Coast Country Club', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 45, name: 'Pinehurst Resort – Course No. 4', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 46, name: 'Pinehurst Resort – Course No. 2', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 47, name: 'Pinehurst Resort – Course No. 10', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 48, name: 'Pinehurst Resort – Course No. 1', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 49, name: 'Pinehurst Resort – Course No. 3', location: 'TBD', par: 72, rating: 70.0, slope: 113 },
    { id: 50, name: 'Pinehurst Resort – Course No. 5', location: 'TBD', par: 72, rating: 70.0, slope: 113 }
  ]);

  const [rounds, setRounds] = useState([
    { id: 1, memberId: 1, courseId: 1, date: '2025-06-01', score: 84, par: 72, status: 'completed' },
    { id: 2, memberId: 2, courseId: 2, date: '2025-06-02', score: 79, par: 71, status: 'completed' },
    { id: 3, memberId: 1, courseId: 3, date: '2025-06-05', time: '10:30 AM', status: 'scheduled' }
  ]);

  const [newRound, setNewRound] = useState({
    memberId: '',
    courseId: '',
    date: '',
    time: '',
    score: '',
    notes: '' // notes was in the original newRound state, keeping it
  });

  const [activeScorecard, setActiveScorecard] = useState(null);
  const [holeScores, setHoleScores] = useState(Array(18).fill(''));

  const getMemberName = (id) => members.find(m => m.id === id)?.name || '';
  const getCourseName = (id) => courses.find(c => c.id === id)?.name || '';

  const calculateHandicap = (scores, courseRating = 72, courseSlope = 113) => {
    if (scores.length < 5) return 0;
    const differentials = scores.map(score => 
      ((score - courseRating) * 113) / courseSlope
    );
    differentials.sort((a, b) => a - b);
    const bestDifferentials = differentials.slice(0, Math.min(8, differentials.length));
    const average = bestDifferentials.reduce((sum, diff) => sum + diff, 0) / bestDifferentials.length;
    return Math.round(average * 10) / 10;
  };

  const addRound = () => {
    if (newRound.memberId && newRound.courseId && newRound.date) {
      const round = {
        id: rounds.length + 1,
        ...newRound,
        memberId: parseInt(newRound.memberId),
        courseId: parseInt(newRound.courseId),
        score: newRound.score ? parseInt(newRound.score) : null,
        status: newRound.score ? 'completed' : 'scheduled'
      };
      setRounds([...rounds, round]);
      setNewRound({ memberId: '', courseId: '', date: '', time: '', score: '', notes: '' });
    }
  };

  const startScorecard = (roundId) => {
    setActiveScorecard(roundId);
    setHoleScores(Array(18).fill(''));
  };

  const exitScorecard = () => setActiveScorecard(null);

  const updateHoleScore = (holeIndex, score) => {
    const newScores = [...holeScores];
    newScores[holeIndex] = score;
    setHoleScores(newScores);
  };

  const saveScorecard = () => {
    const totalScore = holeScores.reduce((sum, score) => sum + (parseInt(score) || 0), 0);
    const updatedRounds = rounds.map(round => 
      round.id === activeScorecard 
        ? { ...round, score: totalScore, status: 'completed', holeScores: [...holeScores] }
        : round
    );
    setRounds(updatedRounds);
    setActiveScorecard(null);
    setHoleScores(Array(18).fill(''));
  };

  const upcomingRounds = rounds.filter(r => r.status === 'scheduled').slice(0, 3);
  const recentRounds = rounds.filter(r => r.status === 'completed').slice(-3);

  // Prepare data for Scorecard component
  let activeScorecardData = null;
  if (activeScorecard) {
    const roundDetails = rounds.find(r => r.id === activeScorecard);
    // Ensure roundDetails is found before trying to access its courseId
    if (roundDetails) {
      const courseDetails = courses.find(c => c.id === roundDetails.courseId);
      activeScorecardData = { round: roundDetails, course: courseDetails };
    }
  }

  // If activeScorecard is set and we have the data, render Scorecard component
  if (activeScorecard && activeScorecardData) {
    return (
      <Scorecard
        activeScorecardData={activeScorecardData}
        holeScores={holeScores}
        updateHoleScore={updateHoleScore}
        saveScorecard={saveScorecard}
        exitScorecard={exitScorecard}
      />
    );
  }

  // Otherwise, render the main app layout with tabs
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-green-800">⛳ Golf Club Manager</h1>
            <div className="flex space-x-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Target },
                { id: 'rounds', label: 'Rounds', icon: Calendar },
                { id: 'members', label: 'Members', icon: Users },
                { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-green-100 text-green-800 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'dashboard' && (
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
        )}

        {activeTab === 'rounds' && (
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
        )}

        {activeTab === 'members' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Club Members</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase