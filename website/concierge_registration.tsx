import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, User, Target, Wrench, Award } from 'lucide-react';

export default function ConciergeRegistration() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    interests: [],
    currentProjects: '',
    learningGoals: '',
    skills: {
      robotics: [],
      mechanics: [],
      iot: [],
      coding: [],
      deepDive: []
    },
    preferredContact: 'discord',
    availableForMeetups: false
  });

  const [recommendedGuilds, setRecommendedGuilds] = useState([]);

  const guilds = {
    robotics: {
      name: 'Robotics',
      icon: '🤖',
      topics: ['Sensors & Actuators', 'Location-aware systems', 'VLM-contextual AI', 'Emergent behaviour', 'AI/ML']
    },
    mechanics: {
      name: 'Mechanics',
      icon: '⚙️',
      topics: ['CAD/CAE/CAM', 'CNC Machining', 'Laser Cutting', '3D Printing', 'Design & Fabrication']
    },
    iot: {
      name: 'IoT',
      icon: '📡',
      topics: ['Home Assistant', 'Tracking systems', 'Electronics', 'Sensor networks', 'Connected devices']
    },
    coding: {
      name: 'Coding',
      icon: '💻',
      topics: ['C/C++', 'Python', 'JavaScript', 'Firmware', 'Software architecture']
    },
    deepDive: {
      name: 'Deep Dive',
      icon: '🔬',
      topics: ['Advanced Math', 'Complex Electronics', 'FEA', 'Engineering theory', 'R&D']
    }
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSkillToggle = (guild, skill) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [guild]: prev.skills[guild].includes(skill)
          ? prev.skills[guild].filter(s => s !== skill)
          : [...prev.skills[guild], skill]
      }
    }));
  };

  const calculateRecommendations = () => {
    const scores = {};
    
    // Score based on interests
    formData.interests.forEach(interest => {
      scores[interest] = (scores[interest] || 0) + 3;
    });
    
    // Score based on skills
    Object.keys(formData.skills).forEach(guild => {
      if (formData.skills[guild].length > 0) {
        scores[guild] = (scores[guild] || 0) + formData.skills[guild].length * 2;
      }
    });
    
    // Score based on keywords in projects and goals
    const text = `${formData.currentProjects} ${formData.learningGoals}`.toLowerCase();
    if (text.includes('robot') || text.includes('ai') || text.includes('ml')) scores.robotics = (scores.robotics || 0) + 2;
    if (text.includes('cad') || text.includes('3d') || text.includes('cnc') || text.includes('print')) scores.mechanics = (scores.mechanics || 0) + 2;
    if (text.includes('home') || text.includes('sensor') || text.includes('iot')) scores.iot = (scores.iot || 0) + 2;
    if (text.includes('code') || text.includes('python') || text.includes('program')) scores.coding = (scores.coding || 0) + 2;
    if (text.includes('math') || text.includes('electronic') || text.includes('fea') || text.includes('theory')) scores.deepDive = (scores.deepDive || 0) + 2;
    
    const sorted = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([guild]) => guild);
    
    setRecommendedGuilds(sorted.length > 0 ? sorted : ['coding', 'iot']);
  };

  const nextStep = () => {
    if (step === 3) {
      calculateRecommendations();
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  const steps = [
    {
      title: 'Welcome!',
      icon: <User className="w-12 h-12" />,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Melbourne Tech Guilds!</h2>
            <p className="text-lg text-gray-600">Let's help you find your perfect guilds and get you connected with fellow makers.</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner - Just getting started</option>
                <option value="intermediate">Intermediate - Some project experience</option>
                <option value="advanced">Advanced - Years of experience</option>
                <option value="expert">Expert - Professional/Deep expertise</option>
              </select>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Your Interests',
      icon: <Target className="w-12 h-12" />,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What interests you?</h2>
            <p className="text-gray-600">Select all the guilds that match your interests (you can join multiple!)</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(guilds).map(([key, guild]) => (
              <div
                key={key}
                onClick={() => handleInterestToggle(key)}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.interests.includes(key)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{guild.icon}</span>
                    <h3 className="text-xl font-semibold">{guild.name}</h3>
                  </div>
                  {formData.interests.includes(key) && (
                    <Check className="w-6 h-6 text-purple-600" />
                  )}
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {guild.topics.slice(0, 3).map((topic, i) => (
                    <li key={i}>• {topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Your Skills',
      icon: <Wrench className="w-12 h-12" />,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What are your current skills?</h2>
            <p className="text-gray-600">Select skills you already have in each area</p>
          </div>
          
          {formData.interests.length > 0 ? (
            <div className="space-y-6">
              {formData.interests.map(interest => (
                <div key={interest} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{guilds[interest].icon}</span>
                    <h3 className="text-xl font-semibold">{guilds[interest].name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {guilds[interest].topics.map(topic => (
                      <button
                        key={topic}
                        onClick={() => handleSkillToggle(interest, topic)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          formData.skills[interest].includes(topic)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>Please select at least one interest in the previous step</p>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Your Goals',
      icon: <Award className="w-12 h-12" />,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tell us about your projects and goals</h2>
            <p className="text-gray-600">Help us connect you with the right guild support</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are you currently working on?
              </label>
              <textarea
                value={formData.currentProjects}
                onChange={(e) => setFormData({...formData, currentProjects: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Building a weather station with ESP32, stuck on getting the sensor data to display correctly..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What would you like help with or learn?
              </label>
              <textarea
                value={formData.learningGoals}
                onChange={(e) => setFormData({...formData, learningGoals: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Need help debugging my code, want to learn proper version control with GitHub, curious about 3D printing..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred contact method
              </label>
              <select
                value={formData.preferredContact}
                onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="discord">Discord</option>
                <option value="email">Email</option>
                <option value="both">Both</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="meetups"
                checked={formData.availableForMeetups}
                onChange={(e) => setFormData({...formData, availableForMeetups: e.target.checked})}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="meetups" className="ml-2 text-sm text-gray-700">
                I'm interested in attending in-person meetups in Melbourne
              </label>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Your Guilds',
      icon: <Check className="w-12 h-12" />,
      component: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome aboard, {formData.name}! 🎉</h2>
            <p className="text-lg text-gray-600">Based on your profile, we recommend these guilds:</p>
          </div>
          
          <div className="space-y-4">
            {recommendedGuilds.map((guildKey, index) => {
              const guild = guilds[guildKey];
              return (
                <div key={guildKey} className="border-2 border-purple-500 bg-purple-50 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{guild.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">{guild.name}</h3>
                        <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                          {index === 0 ? 'Primary Match' : 'Recommended'}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">
                        {index === 0 && "This is your best fit for project support! "}
                        The guild coordinator will reach out to welcome you and connect you with members who can help.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {guild.topics.map(topic => (
                          <span key={topic} className="px-3 py-1 bg-white text-purple-700 text-sm rounded-full border border-purple-200">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold mb-4">Next Steps:</h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">1.</span>
                <span>You'll receive a welcome email with Discord invite link</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">2.</span>
                <span>Guild coordinators will introduce themselves in your recommended channels</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">3.</span>
                <span>Introduce yourself, share your projects, and start connecting!</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600">4.</span>
                <span>Check the events calendar for upcoming meetups and workshops</span>
              </li>
            </ol>
          </div>
          
          <div className="text-center mt-8">
            <button className="px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors">
              Complete Registration
            </button>
            <p className="text-sm text-gray-500 mt-3">melbourne.techguilds.au</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
            <div className="flex justify-between items-center mb-4">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    i <= step ? 'bg-white text-purple-600' : 'bg-purple-400 text-white'
                  }`}>
                    {i < step ? <Check className="w-6 h-6" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-1 w-12 md:w-24 mx-2 ${
                      i < step ? 'bg-white' : 'bg-purple-400'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-white text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                {steps[step].icon}
              </div>
              <h1 className="text-2xl font-bold">{steps[step].title}</h1>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            {steps[step].component}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                step === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            {step < steps.length - 1 && (
              <button
                onClick={nextStep}
                disabled={
                  (step === 0 && (!formData.name || !formData.email || !formData.experience)) ||
                  (step === 1 && formData.interests.length === 0)
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  ((step === 0 && (!formData.name || !formData.email || !formData.experience)) ||
                   (step === 1 && formData.interests.length === 0))
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}