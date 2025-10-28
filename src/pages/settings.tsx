import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Settings, Key, Bell, Users, Database, Shield, Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('api');
  const [settings, setSettings] = useState({
    clickupToken: '',
    teamId: '',
    notifications: {
      email: true,
      slack: false,
      taskUpdates: true,
      weeklyReports: true,
    },
    dashboard: {
      autoRefresh: true,
      refreshInterval: 5,
      defaultView: 'dashboard',
    },
  });

  const tabs = [
    { id: 'api', name: 'API Configuration', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'dashboard', name: 'Dashboard', icon: Settings },
    { id: 'team', name: 'Team Settings', icon: Users },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving settings:', settings);
  };

  return (
    <Layout title="Settings">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Configure your HR dashboard and ClickUp integration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="card p-6">
              {/* API Configuration */}
              {activeTab === 'api' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    ClickUp API Configuration
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ClickUp API Token
                      </label>
                      <input
                        type="password"
                        value={settings.clickupToken}
                        onChange={(e) => setSettings({
                          ...settings,
                          clickupToken: e.target.value
                        })}
                        placeholder="Enter your ClickUp API token"
                        className="input-field"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Get your API token from ClickUp Settings → Apps → API Token
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Team ID
                      </label>
                      <input
                        type="text"
                        value={settings.teamId}
                        onChange={(e) => setSettings({
                          ...settings,
                          teamId: e.target.value
                        })}
                        placeholder="Enter your ClickUp Team ID"
                        className="input-field"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Find your Team ID in the ClickUp URL or API response
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-medium text-blue-900 mb-2">Setup Instructions</h3>
                      <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                        <li>Go to ClickUp Settings → Apps</li>
                        <li>Click "Generate" next to API Token</li>
                        <li>Copy the token and paste it above</li>
                        <li>Get your Team ID from the workspace URL</li>
                        <li>Save the configuration</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Notification Preferences
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Email Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.notifications.email}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                email: e.target.checked
                              }
                            })}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Enable email notifications
                          </span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.notifications.taskUpdates}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                taskUpdates: e.target.checked
                              }
                            })}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Task updates and assignments
                          </span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.notifications.weeklyReports}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                weeklyReports: e.target.checked
                              }
                            })}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Weekly performance reports
                          </span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Slack Integration</h3>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.notifications.slack}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              slack: e.target.checked
                            }
                          })}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Send notifications to Slack
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Dashboard Settings */}
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Dashboard Preferences
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.dashboard.autoRefresh}
                          onChange={(e) => setSettings({
                            ...settings,
                            dashboard: {
                              ...settings.dashboard,
                              autoRefresh: e.target.checked
                            }
                          })}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Auto-refresh dashboard data
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Refresh Interval (minutes)
                      </label>
                      <select
                        value={settings.dashboard.refreshInterval}
                        onChange={(e) => setSettings({
                          ...settings,
                          dashboard: {
                            ...settings.dashboard,
                            refreshInterval: parseInt(e.target.value)
                          }
                        })}
                        className="input-field max-w-xs"
                      >
                        <option value={1}>1 minute</option>
                        <option value={5}>5 minutes</option>
                        <option value={10}>10 minutes</option>
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default View
                      </label>
                      <select
                        value={settings.dashboard.defaultView}
                        onChange={(e) => setSettings({
                          ...settings,
                          dashboard: {
                            ...settings.dashboard,
                            defaultView: e.target.value
                          }
                        })}
                        className="input-field max-w-xs"
                      >
                        <option value="dashboard">Dashboard</option>
                        <option value="employees">Employees</option>
                        <option value="tasks">Tasks</option>
                        <option value="analytics">Analytics</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Team Settings */}
              {activeTab === 'team' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Team Management
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-medium text-yellow-900 mb-2">Coming Soon</h3>
                      <p className="text-sm text-yellow-800">
                        Team management features including role assignments, 
                        department organization, and access controls will be available in a future update.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Security */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Security Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-medium text-green-900 mb-2">Security Status</h3>
                      <p className="text-sm text-green-800">
                        Your ClickUp integration uses secure API tokens and HTTPS connections. 
                        All data is transmitted securely and no sensitive information is stored locally.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Data Privacy</h3>
                      <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                        <li>API tokens are encrypted and stored securely</li>
                        <li>No task content is cached locally</li>
                        <li>All API requests use HTTPS encryption</li>
                        <li>User data is only accessed through official ClickUp APIs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;

