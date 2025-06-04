import React, { useState, useEffect } from 'react';
import { Calendar, Users, Trophy, Target, Clock, Plus } from 'lucide-react'; // Added Plus import

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
    notes: '' // notes was in the original newRound state, keeping it
  });

  const [activeScorecard, setActiveScorecard] = useState(null);
  const [holeScores, setHoleScores] = useState(Array(18).fill(''));
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    handicap: ''
  });
  const [editingMember, setEditingMember] = useState(null);

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

  const addMember = () => {
    if (newMember.name && newMember.email) {
      const member = {
        id: Math.max(...members.map(m => m.id), 0) + 1,
        name: newMember.name,
        email: newMember.email,
        handicap: parseFloat(newMember.handicap) || 0,
        rounds: 0
      };
      setMembers([...members, member]);
      setNewMember({ name: '', email: '', handicap: '' });
    }
  };

  const startEditMember = (member) => {
    setEditingMember(member);
    setNewMember({
      name: member.name,
      email: member.email,
      handicap: member.handicap.toString()
    });
  };

  const saveEditMember = () => {
    if (editingMember && newMember.name && newMember.email) {
      const updatedMembers = members.map(member =>
        member.id === editingMember.id
          ? {
              ...member,
              name: newMember.name,
              email: newMember.email,
              handicap: parseFloat(newMember.handicap) || 0
            }
          : member
      );
      setMembers(updatedMembers);
      setEditingMember(null);
      setNewMember({ name: '', email: '', handicap: '' });
    }
  };

  const cancelEditMember = () => {
    setEditingMember(null);
    setNewMember({ name: '', email: '', handicap: '' });
  };

  const deleteMember = (memberId) => {
    // Check if member has any rounds
    const hasRounds = rounds.some(round => round.memberId === memberId);
    if (hasRounds) {
      alert('Cannot delete member with existing rounds. Please remove their rounds first.');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(member => member.id !== memberId));
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

  // Generate leaderboard data
  const generateLeaderboard = () => {
    return members.map(member => {
      const memberRounds = rounds.filter(r => r.memberId === member.id && r.status === 'completed');
      const totalRounds = memberRounds.length;
      const avgScore = totalRounds > 0 ? 
        Math.round((memberRounds.reduce((sum, round) => sum + round.score, 0) / totalRounds) * 10) / 10 : 0;
      const bestScore = totalRounds > 0 ? Math.min(...memberRounds.map(r => r.score)) : 0;
      
      return {
        ...member,
        totalRounds,
        avgScore,
        bestScore
      };
    }).sort((a, b) => {
      if (a.avgScore === 0 && b.avgScore === 0) return 0;
      if (a.avgScore === 0) return 1;
      if (b.avgScore === 0) return -1;
      return a.avgScore - b.avgScore;
    });
  };

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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Handicap</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Rounds</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {members.map(member => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{member.name}</td>
                      <td className="px-6 py-4 text-gray-600">{member.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                          {member.handicap}
                        </span>
                      </td>
                      <td className="px-6 py-4">{member.rounds}</td>
                      <td className="px-6 py-4">
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Trophy className="text-yellow-600" size={24} />
                <span>Club Leaderboard</span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Player</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Handicap</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Best Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rounds Played</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {generateLeaderboard().map((member, index) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-50 text-blue-800'
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">{member.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                          {member.handicap}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        {member.avgScore > 0 ? member.avgScore : '-'}
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        {member.bestScore > 0 ? member.bestScore : '-'}
                      </td>
                      <td className="px-6 py-4">{member.totalRounds}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GolfApp;
