import { useState } from 'react';
import { CheckCircle2, Search } from 'lucide-react';

interface Lead {
    id: string;
    name: string;
    mobile_number: string;
    city: string;
    status: string;
    created_at: string;
}

interface LeadsSectionProps {
    leads: Lead[];
    onStatusUpdate: (leadId: string, newStatus: string) => Promise<void>;
}

export default function LeadsSection({ leads, onStatusUpdate }: LeadsSectionProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const handleToggleComplete = async (leadId: string, currentStatus: string) => {
        if (updatingId === leadId) return;
        
        // Handle null/empty status as "not completed"
        const isCompleted = (currentStatus || '').toLowerCase() === 'completed';
        const newStatus = isCompleted ? 'new' : 'completed';
        
        setUpdatingId(leadId);
        try {
            await onStatusUpdate(leadId, newStatus);
        } catch (error) {
            console.error('Error updating lead status:', error);
            alert('Failed to update lead status. Please try again.');
        } finally {
            setUpdatingId(null);
        }
    };

    // Filter leads by search query
    const filteredLeads = leads.filter(lead => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
            lead.name.toLowerCase().includes(query) ||
            lead.mobile_number.includes(query) ||
            lead.city.toLowerCase().includes(query)
        );
    });

    // Sort leads: completed ones go to bottom, then by date (newest first)
    const sortedLeads = [...filteredLeads].sort((a, b) => {
        const aCompleted = (a.status || '').toLowerCase() === 'completed';
        const bCompleted = (b.status || '').toLowerCase() === 'completed';
        
        // If one is completed and other isn't, completed goes to bottom
        if (aCompleted && !bCompleted) return 1;
        if (!aCompleted && bCompleted) return -1;
        
        // Both same status, sort by date (newest first)
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return (
        <>
            <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-foreground">Lead Submissions</h2>
                <p className="text-muted-foreground mt-1">View and manage all demo requests from your website</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by name, mobile number, or city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    />
                </div>
            </div>

            {sortedLeads.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-border/50">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                        {searchQuery ? 'No leads found' : 'No leads yet'}
                    </h3>
                    <p className="text-muted-foreground">
                        {searchQuery 
                            ? 'Try a different search term.'
                            : 'Lead submissions will appear here once someone fills the demo form.'}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-border/50">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-accent/30 border-b border-border">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Name</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Mobile Number</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">City</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Submitted On</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Mark as Complete</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                                {sortedLeads.map((lead) => {
                                    const isCompleted = (lead.status || '').toLowerCase() === 'completed';
                                    
                                    return (
                                        <tr 
                                            key={lead.id} 
                                            className={`hover:bg-accent/10 transition-colors ${
                                                isCompleted ? 'bg-green-50/20 opacity-75' : ''
                                            }`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                        isCompleted
                                                            ? 'bg-gradient-to-br from-green-100 to-emerald-100'
                                                            : 'bg-gradient-to-br from-purple-100 to-pink-100'
                                                    }`}>
                                                        <span className={`text-sm font-semibold ${
                                                            isCompleted
                                                                ? 'text-green-600'
                                                                : 'text-purple-600'
                                                        }`}>
                                                            {lead.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <span className="font-medium text-foreground">{lead.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a
                                                    href={`tel:${lead.mobile_number}`}
                                                    className="text-primary hover:underline font-medium"
                                                >
                                                    {lead.mobile_number}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-muted-foreground">{lead.city}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-muted-foreground">{formatDate(lead.created_at)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleToggleComplete(lead.id, lead.status)}
                                                    disabled={updatingId === lead.id}
                                                    type="button"
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                                                        isCompleted
                                                            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                                            : 'bg-green-500 hover:bg-green-600 text-white'
                                                    }`}
                                                >
                                                    {updatingId === lead.id ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                                            {isCompleted ? 'Marking...' : 'Completing...'}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 bg-accent/10 border-t border-border/30">
                        <p className="text-sm text-muted-foreground">
                            Showing <span className="font-semibold text-foreground">{sortedLeads.length}</span> of{' '}
                            <span className="font-semibold text-foreground">{leads.length}</span> leads
                            {searchQuery && ` (filtered by "${searchQuery}")`}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
