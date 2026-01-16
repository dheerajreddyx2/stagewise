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
      <div className="min-h-screen bg-accent/20 flex items-center justify-center">
        <div className="text-primary font-medium animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent/20 font-sans">
      <nav className="bg-white border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-serif font-bold text-foreground">Stagewise Admin</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
             <h2 className="text-3xl font-serif font-bold text-foreground">Transformations</h2>
             <p className="text-muted-foreground mt-1">Manage your virtual staging portfolio</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all font-semibold shadow-lg hover:shadow-glow"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-border/50 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground mb-6">Add New Transformation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Title (e.g., Modern Living Room)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-accent/20"
              />
              <input
                type="text"
                placeholder="Room Type (e.g., Living Room)"
                value={formData.room_type}
                onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-accent/20"
              />
              <input
                type="text"
                placeholder="Before Image URL"
                value={formData.before_image_url}
                onChange={(e) => setFormData({ ...formData, before_image_url: e.target.value })}
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-accent/20 md:col-span-2"
              />
              <input
                type="text"
                placeholder="After Image URL"
                value={formData.after_image_url}
                onChange={(e) => setFormData({ ...formData, after_image_url: e.target.value })}
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-accent/20 md:col-span-2"
              />
              <input
                type="number"
                placeholder="Display Order"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-accent/20"
              />
              <label className="flex items-center gap-3 px-4 py-3 bg-accent/20 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 text-primary rounded focus:ring-primary"
                />
                <span className="text-foreground font-medium">Active (Visible on site)</span>
              </label>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAdd}
                className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-all font-semibold shadow-md"
              >
                Add Transformation
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                className="bg-accent text-foreground px-8 py-3 rounded-xl hover:bg-accent/80 transition-all font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {transformations.map((transformation) => (
            <div
              key={transformation.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300"
            >
              {editingId === transformation.id ? (
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <input
                      type="text"
                      value={transformation.title}
                      onChange={(e) => updateTransformation(transformation.id, 'title', e.target.value)}
                      className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-accent/10"
                    />
                    <input
                      type="text"
                      value={transformation.room_type}
                      onChange={(e) => updateTransformation(transformation.id, 'room_type', e.target.value)}
                      className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-accent/10"
                    />
                    <input
                      type="text"
                      value={transformation.before_image_url}
                      onChange={(e) => updateTransformation(transformation.id, 'before_image_url', e.target.value)}
                      className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-accent/10 md:col-span-2"
                      placeholder="Before Image URL"
                    />
                    <input
                      type="text"
                      value={transformation.after_image_url}
                      onChange={(e) => updateTransformation(transformation.id, 'after_image_url', e.target.value)}
                      className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-accent/10 md:col-span-2"
                      placeholder="After Image URL"
                    />
                    <input
                      type="number"
                      value={transformation.display_order}
                      onChange={(e) => updateTransformation(transformation.id, 'display_order', parseInt(e.target.value))}
                      className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-accent/10"
                      placeholder="Display Order"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleUpdate(transformation.id)}
                      className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all font-medium"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        fetchTransformations();
                      }}
                      className="flex items-center gap-2 bg-accent text-foreground px-6 py-2.5 rounded-xl hover:bg-accent/80 transition-all font-medium"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-80 group">
                      <img
                        src={transformation.before_image_url}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">Before</div>
                    </div>
                    <div className="relative h-64 md:h-80 group">
                      <img
                        src={transformation.after_image_url}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm shadow-lg">After</div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold font-serif text-foreground">{transformation.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-muted-foreground font-medium">{transformation.room_type}</span>
                        <span className="text-border">•</span>
                        <span className="text-muted-foreground">Order: {transformation.display_order}</span>
                      </div>
                      <span
                        className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          transformation.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {transformation.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleActive(transformation.id, transformation.is_active)}
                        className={`p-3 rounded-xl transition-all ${
                          transformation.is_active 
                            ? 'text-muted-foreground hover:bg-accent hover:text-foreground' 
                            : 'text-primary bg-primary/10 hover:bg-primary/20'
                        }`}
                        title={transformation.is_active ? 'Hide from Gallery' : 'Show in Gallery'}
                      >
                        {transformation.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => setEditingId(transformation.id)}
                        className="p-3 text-primary hover:bg-primary/10 rounded-xl transition-all"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(transformation.id)}
                        className="p-3 text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {transformations.length === 0 && !loading && (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-border/50 border-dashed">
            <div className="bg-accent/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No transformations yet</h3>
            <p className="text-muted-foreground mb-6">Add your first virtual staging example to showcase your work.</p>
            <button
               onClick={() => setShowAddForm(true)}
               className="text-primary font-bold hover:underline"
            >
               Add New Transformation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
