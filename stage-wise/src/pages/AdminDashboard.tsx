import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Transformation } from '../lib/database.types';
import { LogOut, Plus, Trash2, Edit2, Save, X, Eye, EyeOff } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    before_image_url: '',
    after_image_url: '',
    room_type: '',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchTransformations();
  }, []);

  async function fetchTransformations() {
    try {
      const { data, error } = await supabase
        .from('transformations')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTransformations(data || []);
    } catch (error) {
      console.error('Error fetching transformations:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    onLogout();
  }

  async function handleAdd() {
    try {
      const { error } = await supabase
        .from('transformations')
        .insert([formData]);

      if (error) throw error;

      setShowAddForm(false);
      resetForm();
      fetchTransformations();
    } catch (error) {
      console.error('Error adding transformation:', error);
      alert('Failed to add transformation');
    }
  }

  async function handleUpdate(id: string) {
    try {
      const transformation = transformations.find((t) => t.id === id);
      if (!transformation) return;

      const { error } = await supabase
        .from('transformations')
        .update({
          title: transformation.title,
          before_image_url: transformation.before_image_url,
          after_image_url: transformation.after_image_url,
          room_type: transformation.room_type,
          display_order: transformation.display_order,
          is_active: transformation.is_active,
        })
        .eq('id', id);

      if (error) throw error;

      setEditingId(null);
      fetchTransformations();
    } catch (error) {
      console.error('Error updating transformation:', error);
      alert('Failed to update transformation');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this transformation?')) return;

    try {
      const { error } = await supabase
        .from('transformations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTransformations();
    } catch (error) {
      console.error('Error deleting transformation:', error);
      alert('Failed to delete transformation');
    }
  }

  async function toggleActive(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('transformations')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchTransformations();
    } catch (error) {
      console.error('Error toggling active status:', error);
      alert('Failed to update status');
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      before_image_url: '',
      after_image_url: '',
      room_type: '',
      display_order: 0,
      is_active: true,
    });
  }

  function updateTransformation(id: string, field: keyof Transformation, value: string | number | boolean) {
    setTransformations(
      transformations.map((t) =>
        t.id === id ? { ...t, [field]: value } : t
      )
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Transformations</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-all font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Add New Transformation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <input
                type="text"
                placeholder="Room Type"
                value={formData.room_type}
                onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <input
                type="text"
                placeholder="Before Image URL"
                value={formData.before_image_url}
                onChange={(e) => setFormData({ ...formData, before_image_url: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 md:col-span-2"
              />
              <input
                type="text"
                placeholder="After Image URL"
                value={formData.after_image_url}
                onChange={(e) => setFormData({ ...formData, after_image_url: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 md:col-span-2"
              />
              <input
                type="number"
                placeholder="Display Order"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <label className="flex items-center gap-2 px-4 py-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="text-slate-700">Active</span>
              </label>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAdd}
                className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-all font-semibold"
              >
                Add Transformation
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-200 transition-all font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {transformations.map((transformation) => (
            <div
              key={transformation.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200"
            >
              {editingId === transformation.id ? (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={transformation.title}
                      onChange={(e) => updateTransformation(transformation.id, 'title', e.target.value)}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    <input
                      type="text"
                      value={transformation.room_type}
                      onChange={(e) => updateTransformation(transformation.id, 'room_type', e.target.value)}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    <input
                      type="text"
                      value={transformation.before_image_url}
                      onChange={(e) => updateTransformation(transformation.id, 'before_image_url', e.target.value)}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 md:col-span-2"
                      placeholder="Before Image URL"
                    />
                    <input
                      type="text"
                      value={transformation.after_image_url}
                      onChange={(e) => updateTransformation(transformation.id, 'after_image_url', e.target.value)}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 md:col-span-2"
                      placeholder="After Image URL"
                    />
                    <input
                      type="number"
                      value={transformation.display_order}
                      onChange={(e) => updateTransformation(transformation.id, 'display_order', parseInt(e.target.value))}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="Display Order"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdate(transformation.id)}
                      className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        fetchTransformations();
                      }}
                      className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-all"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-0">
                    <img
                      src={transformation.before_image_url}
                      alt="Before"
                      className="w-full h-64 object-cover"
                    />
                    <img
                      src={transformation.after_image_url}
                      alt="After"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{transformation.title}</h3>
                        <p className="text-slate-600 mt-1">
                          {transformation.room_type} • Order: {transformation.display_order}
                        </p>
                        <span
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                            transformation.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {transformation.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleActive(transformation.id, transformation.is_active)}
                          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                          title={transformation.is_active ? 'Hide' : 'Show'}
                        >
                          {transformation.is_active ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => setEditingId(transformation.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(transformation.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {transformations.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <p className="text-slate-600 text-lg">No transformations yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
