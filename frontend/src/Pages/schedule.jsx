import React, { useState, useEffect } from 'react';
import { IoArrowBack, IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

// Placeholder API URL (replace with the actual API endpoint)
const API_URL = 'http://localhost:3000/train';

const SchedulePage = () => {
  useEffect(() => {
    document.title = 'Station Saarthi | Schedule';
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [trainDetails, setTrainDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to search train by either number or name
  const searchTrain = async () => {
    if (!searchQuery) {
      setError('Please enter a train number or name to search');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/${searchQuery}`);
      if (!response.ok) {
        throw new Error('Train not found');
      }

      const data = await response.json();
      setTrainDetails(data); // Assuming the API returns a train object
    } catch (error) {
      setError(error.message || 'An error occurred while fetching the train details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen">
      <div
        className="absolute inset-0 bg-transparent"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
        }}
      />

      <div className="relative w-full  px-4 py-8 z-10 flex items-center justify-center  flex-col">
        <div className="w-full max-w-md mx-auto flex items-center mb-6 ">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-blue-200 transition-colors"
          >
            <IoArrowBack size={24} />
            <span className="text-lg font-medium ml-2">Back</span>
          </button>
        </div>

        <div className="w-9/12  bg-white bg-opacity-90 rounded-lg shadow-md p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-center mb-6 py-2 bg-blue-100 border border-blue-300 rounded-3xl shadow-sm">
            Train Schedule
          </h2>

          <div className="space-y-4">
            {/* Search input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Search by Train Number or Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter train number or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <IoSearchOutline
                  className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  size={20}
                  onClick={searchTrain}
                />
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            {/* Display train details */}
            {loading && <p>Loading...</p>}
            {trainDetails && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Train Number</label>
                  <input
                    type="text"
                    value={trainDetails.trainNumber}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Train Name</label>
                  <input
                    type="text"
                    value={trainDetails.trainName}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Next Station</label>
                  <input
                    type="text"
                    value={trainDetails.nextStation?.name || 'N/A'}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Services</label>
                  <input
                    type="text"
                    value={trainDetails.services?.join(', ') || 'N/A'}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Platform Details</label>
                  <input
                    type="text"
                    value={trainDetails.platformDetails?.platformNumber || 'N/A'}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Coach Details</label>
                  <input
                    type="text"
                    value={
                      trainDetails.coachDetails
                        ?.map(coach => `${coach.coachNumber} (${coach.coachType})`)
                        .join(', ') || 'N/A'
                    }
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Button to search */}
            <button
              className="w-full py-2 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={searchTrain}
            >
              Search Train
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
