import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('notes-app-user');
    const savedNotes = localStorage.getItem('notes-app-notes');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes - check against registered users in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('notes-app-registered-users') || '[]');
    const existingUser = registeredUsers.find((u: any) => u.email === email && u.password === password);
    
    if (!existingUser) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    
    const userData: User = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    };
    
    setUser(userData);
    localStorage.setItem('notes-app-user', JSON.stringify(userData));
    
    // Load user's notes
    const userNotes = JSON.parse(localStorage.getItem(`notes-app-notes-${userData.id}`) || '[]');
    setNotes(userNotes);
    localStorage.setItem('notes-app-notes', JSON.stringify(userNotes));
    
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const registeredUsers = JSON.parse(localStorage.getItem('notes-app-registered-users') || '[]');
    const existingUser = registeredUsers.find((u: any) => u.email === email);
    
    if (existingUser) {
      setIsLoading(false);
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In real app, this would be hashed
    };
    
    registeredUsers.push(newUser);
    localStorage.setItem('notes-app-registered-users', JSON.stringify(registeredUsers));
    
    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
    
    setUser(userData);
    localStorage.setItem('notes-app-user', JSON.stringify(userData));
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setNotes([]);
    localStorage.removeItem('notes-app-user');
    localStorage.removeItem('notes-app-notes');
  };

  const addNote = (noteData: Omit<Note, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...noteData,
    };
    
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('notes-app-notes', JSON.stringify(updatedNotes));
    localStorage.setItem(`notes-app-notes-${user.id}`, JSON.stringify(updatedNotes));
  };

  const updateNote = (id: string, noteUpdate: Partial<Note>) => {
    if (!user) return;
    
    const updatedNotes = notes.map(note => 
      note.id === id 
        ? { ...note, ...noteUpdate, updatedAt: new Date().toISOString() }
        : note
    );
    
    setNotes(updatedNotes);
    localStorage.setItem('notes-app-notes', JSON.stringify(updatedNotes));
    localStorage.setItem(`notes-app-notes-${user.id}`, JSON.stringify(updatedNotes));
  };

  const deleteNote = (id: string) => {
    if (!user) return;
    
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes-app-notes', JSON.stringify(updatedNotes));
    localStorage.setItem(`notes-app-notes-${user.id}`, JSON.stringify(updatedNotes));
  };

  const getNote = (id: string): Note | undefined => {
    return notes.find(note => note.id === id);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNote,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};