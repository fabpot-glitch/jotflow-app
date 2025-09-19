import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  LogOut, 
  Edit3, 
  Trash2, 
  StickyNote,
  Calendar,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import NoteDialog from '@/components/NoteDialog';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user, notes, logout, deleteNote } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const handleDeleteNote = (noteId: string, noteTitle: string) => {
    deleteNote(noteId);
    toast({
      title: "Note deleted",
      description: `"${noteTitle}" has been deleted.`,
    });
  };

  const handleEditNote = (noteId: string) => {
    setEditingNote(noteId);
    setIsNoteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsNoteDialogOpen(false);
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen gradient-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 gradient-primary rounded-xl">
                  <StickyNote className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Notes Manager</h1>
                  <p className="text-sm text-muted-foreground">Organize your thoughts</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="transition-smooth"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 form-input"
            />
          </div>
          <Button 
            onClick={() => setIsNoteDialogOpen(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 gradient-primary rounded-lg">
                  <StickyNote className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{notes.length}</p>
                  <p className="text-sm text-muted-foreground">Total Notes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent rounded-lg">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {notes.filter(note => {
                      const today = new Date();
                      const noteDate = new Date(note.createdAt);
                      return noteDate.toDateString() === today.toDateString();
                    }).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-success rounded-lg">
                  <Edit3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {notes.filter(note => {
                      const updated = new Date(note.updatedAt);
                      const created = new Date(note.createdAt);
                      return updated.getTime() > created.getTime();
                    }).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Edited</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 gradient-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <StickyNote className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchTerm ? 'No notes found' : 'No notes yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Create your first note to get started'
              }
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => setIsNoteDialogOpen(true)}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Note
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="note-card border-0">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold text-foreground truncate">
                        {note.title}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs">
                          {format(new Date(note.createdAt), 'MMM d, yyyy')}
                        </span>
                        {note.updatedAt !== note.createdAt && (
                          <Badge variant="secondary" className="text-xs px-2 py-0">
                            Edited
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {note.description}
                  </p>
                </CardContent>
                
                <div className="px-6 pb-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditNote(note.id)}
                    className="transition-smooth"
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteNote(note.id, note.title)}
                    className="text-destructive hover:text-destructive transition-smooth"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Note Dialog */}
      <NoteDialog
        isOpen={isNoteDialogOpen}
        onClose={handleCloseDialog}
        editingNoteId={editingNote}
      />
    </div>
  );
};

export default Dashboard;