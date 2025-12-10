
import React, { useState } from 'react';
import { MOCK_NOTES } from '../constants';
import { Search as SearchIcon, Filter, X, SlidersHorizontal, BadgeCheck } from 'lucide-react';
import { Note, NoteStatus, UserRole } from '../types';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchType, setSearchType] = useState<'ALL' | 'INSTRUCTOR' | 'STUDENT'>('ALL');

  // Derive unique filters
  const universities = Array.from(new Set(MOCK_NOTES.map(n => n.university)));
  const courses = Array.from(new Set(MOCK_NOTES.map(n => n.course)));

  const filteredNotes = MOCK_NOTES.filter(note => {
    const matchesQuery = note.title.includes(query) || note.description.includes(query) || note.tags.some(t => t.includes(query));
    const matchesUni = selectedUniversity ? note.university === selectedUniversity : true;
    const matchesCourse = selectedCourse ? note.course === selectedCourse : true;
    const matchesType = searchType === 'ALL' 
        ? true 
        : searchType === 'INSTRUCTOR' 
            ? note.author.role === UserRole.INSTRUCTOR 
            : note.author.role === UserRole.STUDENT;

    return matchesQuery && matchesUni && matchesCourse && matchesType && note.status === NoteStatus.PUBLISHED;
  });

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-140px)]">
      {/* Filters Sidebar */}
      <div className={`
        fixed inset-0 z-30 bg-white p-6 md:static md:w-72 md:bg-transparent md:p-0 md:block transition-transform duration-300 overflow-y-auto
        ${showFilters ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}
      `}>
        <div className="flex items-center justify-between md:hidden mb-6">
            <h3 className="font-bold text-lg">فیلترها</h3>
            <button onClick={() => setShowFilters(false)}><X /></button>
        </div>

        <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Filter size={18} />
                    دانشگاه
                </h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="uni" 
                            checked={selectedUniversity === ''}
                            onChange={() => setSelectedUniversity('')}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                        />
                        <span className="text-sm text-slate-600">همه</span>
                    </label>
                    {universities.map(uni => (
                        <label key={uni} className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="uni" 
                                checked={selectedUniversity === uni}
                                onChange={() => setSelectedUniversity(uni)}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                            />
                            <span className="text-sm text-slate-600">{uni}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <BookOpenIcon size={18} />
                    درس
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="course" 
                            checked={selectedCourse === ''}
                            onChange={() => setSelectedCourse('')}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                        />
                        <span className="text-sm text-slate-600">همه</span>
                    </label>
                    {courses.map(crs => (
                        <label key={crs} className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="course" 
                                checked={selectedCourse === crs}
                                onChange={() => setSelectedCourse(crs)}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                            />
                            <span className="text-sm text-slate-600">{crs}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Main Search Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
                <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="جستجو در نام جزوه، استاد، درس..." 
                    className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                />
            </div>
            <button 
                onClick={() => setShowFilters(true)}
                className="md:hidden bg-white border border-slate-200 p-3 rounded-xl text-slate-600"
            >
                <SlidersHorizontal size={20} />
            </button>
        </div>

        {/* List Types Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            <button 
                onClick={() => setSearchType('ALL')} 
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${searchType === 'ALL' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
            >
                همه جزوات
            </button>
            <button 
                onClick={() => setSearchType('INSTRUCTOR')} 
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${searchType === 'INSTRUCTOR' ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
            >
                {searchType !== 'INSTRUCTOR' ? (
                     <BadgeCheck size={16} className="text-blue-500" />
                ) : (
                    <BadgeCheck size={16} className="text-white" />
                )}
                جزوات اساتید (تایید شده)
            </button>
            <button 
                onClick={() => setSearchType('STUDENT')} 
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${searchType === 'STUDENT' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
            >
                جزوات دانشجویی
            </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto pb-10">
            <div className="space-y-4">
                {filteredNotes.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg">نتیجه‌ای یافت نشد.</p>
                    </div>
                ) : (
                    filteredNotes.map(note => (
                        <div key={note.id} className="block bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group relative">
                            <Link to={`/note/${note.id}`} className="absolute inset-0 z-0"></Link>
                            <div className="flex items-start gap-4 pointer-events-none">
                                <img src={note.thumbnailUrl} alt="" className="w-24 h-24 object-cover rounded-lg bg-slate-100 hidden sm:block z-10" />
                                <div className="flex-1 z-10">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{note.title}</h3>
                                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-bold">{note.fileType.toUpperCase()}</span>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-2 line-clamp-2">{note.description}</p>
                                    <div className="flex flex-wrap gap-2 text-xs text-slate-400 pointer-events-auto">
                                        <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                                            {note.course}
                                        </span>
                                        <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                                            {note.university}
                                        </span>
                                        <Link to={`/profile/${note.author.id}`} className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded text-slate-600 font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                            استاد: {note.author.name}
                                            {note.author.role === UserRole.INSTRUCTOR && (
                                                <BadgeCheck size={14} className="text-blue-600 fill-blue-100" />
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

const BookOpenIcon = ({ size }: { size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

export default SearchPage;
