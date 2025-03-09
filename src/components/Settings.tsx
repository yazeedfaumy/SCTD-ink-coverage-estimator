import React, { useState } from "react";
import { Save, Globe, CreditCard, Lock, User, ChevronDown } from "lucide-react";
interface CartridgeSettings {
  mode: "separate" | "combined";
  separate?: {
    cyan: {
      price: number;
      yield: number;
    };
    magenta: {
      price: number;
      yield: number;
    };
    yellow: {
      price: number;
      yield: number;
    };
    key: {
      price: number;
      yield: number;
    };
  };
  combined?: {
    color: {
      price: number;
      yield: number;
    };
    key: {
      price: number;
      yield: number;
    };
  };
}
export function Settings() {
  const [activeSection, setActiveSection] = useState<string>("profile");
  const [loading, setLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john@example.com"
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [language, setLanguage] = useState("en");
  const [cartridgeMode, setCartridgeMode] = useState<"separate" | "combined">("separate");
  const [cartridgeSettings, setCartridgeSettings] = useState<CartridgeSettings>({
    mode: "separate",
    separate: {
      cyan: {
        price: 25,
        yield: 1000
      },
      magenta: {
        price: 25,
        yield: 1000
      },
      yellow: {
        price: 25,
        yield: 1000
      },
      key: {
        price: 20,
        yield: 1500
      }
    },
    combined: {
      color: {
        price: 60,
        yield: 3000
      },
      key: {
        price: 20,
        yield: 1500
      }
    }
  });
  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match!");
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPasswords({
      current: "",
      new: "",
      confirm: ""
    });
    setLoading(false);
  };
  const handleCartridgeSettingChange = (mode: "separate" | "combined", cartridge: string, field: "price" | "yield", value: string) => {
    const numValue = parseFloat(value) || 0;
    setCartridgeSettings(prev => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [cartridge]: {
          ...prev[mode][cartridge],
          [field]: numValue
        }
      }
    }));
  };
  return <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-green-800">Settings</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="sm:hidden">
          <select className="w-full border-0 py-3 pl-3 pr-10 text-base focus:outline-none focus:ring-0" value={activeSection} onChange={e => setActiveSection(e.target.value)}>
            <option value="profile">Profile</option>
            <option value="security">Security</option>
            <option value="preferences">Preferences</option>
            <option value="cartridge">Cartridge Settings</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex divide-x divide-gray-200">
            {["profile", "security", "preferences", "cartridge"].map(section => <button key={section} onClick={() => setActiveSection(section)} className={`flex-1 px-4 py-3 text-sm font-medium text-center capitalize ${activeSection === section ? "text-green-700 bg-green-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
                  {section}
                </button>)}
          </nav>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow">
        {activeSection === "profile" && <form onSubmit={handlePersonalInfoSubmit} className="p-6 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input type="text" id="name" value={personalInfo.name} onChange={e => setPersonalInfo(prev => ({
              ...prev,
              name: e.target.value
            }))} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input type="email" id="email" value={personalInfo.email} onChange={e => setPersonalInfo(prev => ({
              ...prev,
              email: e.target.value
            }))} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={loading} className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>}
        {activeSection === "security" && <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">
                  Change Password
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input type="password" id="currentPassword" value={passwords.current} onChange={e => setPasswords(prev => ({
              ...prev,
              current: e.target.value
            }))} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500" />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input type="password" id="newPassword" value={passwords.new} onChange={e => setPasswords(prev => ({
              ...prev,
              new: e.target.value
            }))} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input type="password" id="confirmPassword" value={passwords.confirm} onChange={e => setPasswords(prev => ({
              ...prev,
              confirm: e.target.value
            }))} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={loading} className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <Save className="h-4 w-4 mr-2" />
                Update Password
              </button>
            </div>
          </form>}
        {activeSection === "preferences" && <div className="p-6 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">
                  Language & Regional
                </h2>
              </div>
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select id="language" value={language} onChange={e => setLanguage(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button type="button" className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </button>
            </div>
          </div>}
        {activeSection === "cartridge" && <div className="p-6 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">
                  Default Cartridge Settings
                </h2>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cartridge Mode
              </label>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center">
                  <input type="radio" value="separate" checked={cartridgeMode === "separate"} onChange={e => setCartridgeMode(e.target.value as "separate" | "combined")} className="form-radio h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300" />
                  <span className="ml-2">Separate Cartridges</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="combined" checked={cartridgeMode === "combined"} onChange={e => setCartridgeMode(e.target.value as "separate" | "combined")} className="form-radio h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300" />
                  <span className="ml-2">Combined Color Cartridge</span>
                </label>
              </div>
            </div>
            {cartridgeMode === "separate" ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["cyan", "magenta", "yellow", "key"].map(color => <div key={color} className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-900 capitalize">
                      {color} Cartridge
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500">
                          Price
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input type="number" value={cartridgeSettings.separate[color].price} onChange={e => handleCartridgeSettingChange("separate", color, "price", e.target.value)} className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-3 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">
                          Yield (pages)
                        </label>
                        <input type="number" value={cartridgeSettings.separate[color].yield} onChange={e => handleCartridgeSettingChange("separate", color, "yield", e.target.value)} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="0" />
                      </div>
                    </div>
                  </div>)}
              </div> : <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Color Cartridge (CMY)
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500">
                        Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input type="number" value={cartridgeSettings.combined.color.price} onChange={e => handleCartridgeSettingChange("combined", "color", "price", e.target.value)} className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-3 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">
                        Yield (pages)
                      </label>
                      <input type="number" value={cartridgeSettings.combined.color.yield} onChange={e => handleCartridgeSettingChange("combined", "color", "yield", e.target.value)} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="0" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Black Cartridge
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500">
                        Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input type="number" value={cartridgeSettings.combined.key.price} onChange={e => handleCartridgeSettingChange("combined", "key", "price", e.target.value)} className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-3 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">
                        Yield (pages)
                      </label>
                      <input type="number" value={cartridgeSettings.combined.key.yield} onChange={e => handleCartridgeSettingChange("combined", "key", "yield", e.target.value)} className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>}
            <div className="flex justify-end">
              <button type="button" className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <Save className="h-4 w-4 mr-2" />
                Save Cartridge Settings
              </button>
            </div>
          </div>}
      </div>
    </div>;
}