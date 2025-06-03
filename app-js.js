import React, { useState, useEffect } from 'react';
import { Calendar, Users, Trophy, Target, Plus, Edit2, Trash2, Clock, MapPin, Star } from 'lucide-react';

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
    { id: 3, name: 'Riverwood Golf Club', location: 'Matthews, NC', par: 72, rating: 71.8, slope: 132 }
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
    notes: ''
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

  if (activeScorecard) {
    const round = rounds.find(r => r.id === activeScorecard);
    const course = courses.find(c => c.id === round.courseId);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Live Scorecard</h2>
                <p className="text-gray-600">{course.name} - Par {course.par}</p>
              </div>
              <button 
                onClick={() => setActiveScorecard(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Exit
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {Array.from({length: 18}, (_, i) => (
                <div key={i} className="bg-green-50 p-4 rounded-lg border">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600">Hole {i + 1}</div>
                    <div className="text-xs text-gray-500 mb-2">Par {3 + (i % 3)}</div>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={holeScores[i]}
                      onChange={(e) => updateHoleScore(i, e.target.value)}
                      className="w-full text-center text-lg font-bold border-2 border-green-200 rounded focus:border-green-500 focus:outline-none"
                      placeholder="-"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="text-lg font-semibold">
                Total Score: {holeScores.reduce((sum, score) => sum + (parseInt(score) || 0), 0)}
              </div>
              <button 
                onClick={saveScorecard}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                Save Round
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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