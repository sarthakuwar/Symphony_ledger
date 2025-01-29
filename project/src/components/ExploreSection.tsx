import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { songs } from '../data/songs';
import { Song, Genre } from '../types/music';
import { SongCard } from './SongCard';
import { SongInfoModal } from './SongInfoModal';
import { AudioPlayer } from './AudioPlayer';

export function ExploreSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<Genre>('All');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [playingSong, setPlayingSong] = useState<Song | null>(null);

  const genres: Genre[] = ['All', 'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'R&B'];

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handlePlay = (song: Song) => {
    setPlayingSong(song);
  };

  const handleShowInfo = (song: Song) => {
    setSelectedSong(song);
    setShowInfoModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Genre Filters */}
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedGenre === genre
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onPlay={handlePlay}
            onShowInfo={handleShowInfo}
          />
        ))}
      </div>

      {/* Info Modal */}
      {showInfoModal && selectedSong && (
        <SongInfoModal
          song={selectedSong}
          onClose={() => {
            setShowInfoModal(false);
            setSelectedSong(null);
          }}
        />
      )}

      {/* Audio Player */}
      {playingSong && (
        <AudioPlayer
          song={playingSong}
          onClose={() => setPlayingSong(null)}
        />
      )}
    </div>
  );
}