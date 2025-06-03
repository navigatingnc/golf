import React from 'react';

const Scorecard = ({ activeScorecardData, holeScores, updateHoleScore, saveScorecard, exitScorecard }) => {
  if (!activeScorecardData) return null;

  const { round, course } = activeScorecardData;

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
              onClick={exitScorecard}
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
                  <div className="text-xs text-gray-500 mb-2">Par {3 + (i % 3)}</div> {/* Assuming par varies like this for example */}
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
};

export default Scorecard;
