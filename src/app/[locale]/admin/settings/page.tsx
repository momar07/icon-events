'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, RefreshCw } from 'lucide-react';

interface CompanyInfoItem {
  id: number;
  key: string;
  value: string | null;
}

const KEY_LABELS: Record<string, { en: string; ar: string; type: 'text' | 'textarea' | 'json' }> = {
  brand_tagline: { en: 'Brand Tagline', ar: 'شعار العلامة التجارية', type: 'text' },
  company_story: { en: 'Company Story', ar: 'قصة الشركة', type: 'json' },
  vision: { en: 'Vision', ar: 'الرؤية', type: 'json' },
  mission: { en: 'Mission', ar: 'المهمة', type: 'json' },
  statistics: { en: 'Statistics', ar: 'الإحصائيات', type: 'json' },
  team_members: { en: 'Team Members', ar: 'أعضاء الفريق', type: 'json' },
  timeline: { en: 'Company Timeline', ar: 'الجدول الزمني', type: 'json' },
  contact_email: { en: 'Contact Email', ar: 'البريد الإلكتروني', type: 'text' },
  contact_phone: { en: 'Contact Phone', ar: 'رقم الهاتف', type: 'text' },
  contact_address: { en: 'Address', ar: 'العنوان', type: 'text' },
  social_instagram: { en: 'Instagram URL', ar: 'رابط انستجرام', type: 'text' },
  social_facebook: { en: 'Facebook URL', ar: 'رابط فيسبوك', type: 'text' },
  social_twitter: { en: 'Twitter / X URL', ar: 'رابط تويتر', type: 'text' },
  social_linkedin: { en: 'LinkedIn URL', ar: 'رابط لينكدإن', type: 'text' },
};

export default function AdminSettingsPage() {
  const [items, setItems] = useState<CompanyInfoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/company-info');
      const data = await res.json();
      if (data.data) {
        setItems(data.data);
        const vals: Record<string, string> = {};
        data.data.forEach((item: CompanyInfoItem) => {
          vals[item.key] = item.value || '';
        });
        setEditValues(vals);
      }
    } catch {
      // error
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key: string) => {
    setSaving(key);
    try {
      await fetch('/api/company-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: editValues[key] || '' }),
      });
    } catch {
      // error
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-electric-cyan" />
      </div>
    );
  }

  const allKeys = Object.keys(KEY_LABELS);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-steel-gray text-sm mt-1">Manage company information</p>
        </div>
        <button
          onClick={fetchData}
          className="p-2 rounded-lg text-steel-gray hover:text-white hover:bg-white/5 transition-all"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {allKeys.map((key) => {
          const meta = KEY_LABELS[key];
          const val = editValues[key] ?? '';

          return (
            <div key={key} className="bg-[#0d1230] border border-electric-cyan/10 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-medium text-sm">{meta.en}</h3>
                  <p className="text-steel-gray text-xs">{key}</p>
                </div>
                <button
                  onClick={() => handleSave(key)}
                  disabled={saving === key}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-cyan/10 text-electric-cyan text-xs font-medium hover:bg-electric-cyan/20 disabled:opacity-50 transition-all"
                >
                  {saving === key ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  Save
                </button>
              </div>

              {meta.type === 'text' ? (
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setEditValues({ ...editValues, [key]: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-deep-black border border-electric-cyan/20 text-white text-sm placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
                />
              ) : (
                <textarea
                  rows={meta.type === 'json' ? 6 : 3}
                  value={val}
                  onChange={(e) => setEditValues({ ...editValues, [key]: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-deep-black border border-electric-cyan/20 text-white text-sm placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all resize-none font-mono"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
