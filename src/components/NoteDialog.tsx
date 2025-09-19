import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingNoteId?: string | null;
}

const NoteDialog: React.FC<NoteDialogProps> = ({ isOpen, onClose, editingNoteId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addNote, updateNote, getNote } = useAuth();
  const { toast } = useToast();

  const isEditing = Boolean(editingNoteId);
  const editingNote = editingNoteId ? getNote(editingNoteId) : null;

  useEffect(() => {
    if (isOpen) {
      if (isEditing && editingNote) {
        setTitle(editingNote.title);
        setDescription(editingNote.description);
      } else {
        setTitle('');
        setDescription('');
      }
    }
  }, [isOpen, isEditing, editingNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your note.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (isEditing && editingNoteId) {
        updateNote(editingNoteId, {
          title: title.trim(),
          description: description.trim(),
        });
        toast({
          title: "Note updated",
          description: "Your note has been successfully updated.",
        });
      } else {
        addNote({
          title: title.trim(),
          description: description.trim(),
        });
        toast({
          title: "Note created",
          description: "Your new note has been created successfully.",
        });
      }
      
      onClose();
      setTitle('');
      setDescription('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] shadow-strong">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? 'Edit Note' : 'Create New Note'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Make changes to your note below.' 
              : 'Add a new note to your collection.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                disabled={isLoading}
                autoFocus
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Write your note content here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[200px] form-input resize-none"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="transition-smooth"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="btn-primary"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update Note' : 'Create Note'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;